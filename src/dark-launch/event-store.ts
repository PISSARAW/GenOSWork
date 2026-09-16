/**
 * EventStore — persistance des événements delta.
 *
 * Choix : SQLite en mémoire (avec export optionnel vers fichier).
 * Justification :
 * - Queryable (SQL) pour investiguer les alertes (filtrer par requestId, plage de temps,
 *   alertTriggered = true, etc.).
 * - Léger, pas de serveur, pas de configuration.
 * - Export facile vers un fichier SQLite pour l'audit / archival.
 * - Alternatives rejetées :
 *   - JSONL : moins queryable, pas d'index, parsing nécessaire pour chaque requête.
 *   - Bus message (Redis/NATS) : overkill pour un dark-launch interne, et la persistence
 *     serait externalisée, ce qui complexifie le 디버깅.
 *   - Base PostgreSQL : trop lourd pour l'alpha, pas encore nécessaire.
 *
 * L'EventStore est thread-safe pour un seul worker. Si plusieurs workers sont ajoutés
 * plus tard, on passera à une base fichier avec locking ou un vrai SGBD.
 */

import initSqlJs, { Database } from 'sql.js';
import type { DeltaEvent } from './delta-comparator.js';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as fs from 'node:fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface EventStoreOptions {
  /** Chemin du fichier SQLite. Si non fourni, base en mémoire. */
  path?: string;
  /** Si true, exporte la base en mémoire vers le fichier au moment du close(). */
  persistOnClose?: boolean;
}

export class EventStore {
  private db: Database | null = null;
  private sql: Awaited<ReturnType<typeof initSqlJs>> | null = null;
  private readonly persistOnClose: boolean;
  private readonly filePath?: string;

  constructor(options: EventStoreOptions = {}) {
    this.persistOnClose = options.persistOnClose ?? false;
    this.filePath = options.path;
  }

  async initialize(): Promise<void> {
    if (this.db) return;
    this.sql = await initSqlJs();
    this.db = new this.sql.Database();
    this.db.run(`CREATE TABLE IF NOT EXISTS delta_events (
      id TEXT PRIMARY KEY,
      requestId TEXT NOT NULL,
      timestamp INTEGER NOT NULL,
      oldPrice REAL NOT NULL,
      newPrice REAL NOT NULL,
      deltaAbsolute REAL NOT NULL,
      deltaRelative REAL NOT NULL,
      deltaSign INTEGER NOT NULL,
      thresholds TEXT NOT NULL,
      alertTriggered INTEGER NOT NULL,
      alertSeverity TEXT,
      context TEXT NOT NULL
    )`);
    this.db.run(`CREATE INDEX IF NOT EXISTS idx_delta_events_requestId ON delta_events(requestId)`);
    this.db.run(`CREATE INDEX IF NOT EXISTS idx_delta_events_alertTriggered ON delta_events(alertTriggered)`);
    this.db.run(`CREATE INDEX IF NOT EXISTS idx_delta_events_timestamp ON delta_events(timestamp)`);
    if (this.filePath && this.filePath !== ':memory:') {
      await this.saveToFile();
    }
  }

  /** Persiste un événement delta. */
  persist(event: DeltaEvent): void {
    if (!this.db) throw new Error('EventStore not initialized — call initialize() first');
    const stmt = this.db.prepare(`INSERT INTO delta_events (id, requestId, timestamp, oldPrice, newPrice,
      deltaAbsolute, deltaRelative, deltaSign, thresholds,
      alertTriggered, alertSeverity, context)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
    stmt.bind([
      event.id,
      event.requestId,
      event.timestamp,
      event.oldPrice,
      event.newPrice,
      event.deltaAbsolute,
      event.deltaRelative,
      event.deltaSign,
      JSON.stringify(event.thresholds),
      event.alertTriggered ? 1 : 0,
      event.alertSeverity ?? null,
      JSON.stringify(event.context),
    ]);
    stmt.step();
    stmt.free();
    if (this.filePath && this.filePath !== ':memory:') this.saveToFile();
  }

  /** Récupère un événement par requestId. */
  getByRequestId(requestId: string): DeltaEvent | undefined {
    if (!this.db) throw new Error('EventStore not initialized');
    const stmt = this.db.prepare('SELECT * FROM delta_events WHERE requestId = ?');
    stmt.bind([requestId]);
    if (!stmt.step()) {
      stmt.free();
      return undefined;
    }
    const row = stmt.getAsObject() as Record<string, unknown>;
    stmt.free();
    return this.rowToEvent(row);
  }

  /** Liste les événements, avec filtres optionnels. */
  list(options: {
    alertOnly?: boolean;
    limit?: number;
    beforeTimestamp?: number;
  } = {}): DeltaEvent[] {
    if (!this.db) throw new Error('EventStore not initialized');
    let sql = 'SELECT * FROM delta_events WHERE 1=1';
    const params: (string | number)[] = [];
    if (options.alertOnly) {
      sql += ' AND alertTriggered = 1';
    }
    if (options.beforeTimestamp != null) {
      sql += ' AND timestamp <= ?';
      params.push(options.beforeTimestamp);
    }
    sql += ' ORDER BY timestamp DESC';
    if (options.limit != null && options.limit > 0) {
      sql += ' LIMIT ?';
      params.push(options.limit);
    }
    const stmt = this.db.prepare(sql);
    stmt.bind(params);
    const results: DeltaEvent[] = [];
    while (stmt.step()) {
      const row = stmt.getAsObject() as Record<string, unknown>;
      results.push(this.rowToEvent(row));
    }
    stmt.free();
    return results;
  }

  /** Compte les alertes dans une plage de temps. */
  countAlertsBetween(startTs: number, endTs: number): number {
    if (!this.db) throw new Error('EventStore not initialized');
    const stmt = this.db.prepare(
      'SELECT COUNT(*) as count FROM delta_events WHERE alertTriggered = 1 AND timestamp >= ? AND timestamp <= ?',
    );
    stmt.bind([startTs, endTs]);
    stmt.step();
    const row = stmt.getAsObject() as { count: number };
    stmt.free();
    return row.count;
  }

  async saveToFile(): Promise<void> {
    if (!this.db || !this.filePath || this.filePath === ':memory:') return;
    const data = this.db.export();
    const buffer = Buffer.from(data);
    const dir = dirname(this.filePath);
    if (dir) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(this.filePath, buffer);
  }

  close(): void {
    if (this.db) {
      if (this.persistOnClose && this.filePath) {
        this.db.run('PRAGMA wal_checkpoint(TRUNCATE)');
      }
      this.db.close();
      this.db = null;
    }
  }

  private rowToEvent(row: Record<string, unknown>): DeltaEvent {
    return {
      id: row.id as string,
      requestId: row.requestId as string,
      timestamp: row.timestamp as number,
      oldPrice: row.oldPrice as number,
      newPrice: row.newPrice as number,
      deltaAbsolute: row.deltaAbsolute as number,
      deltaRelative: row.deltaRelative as number,
      deltaSign: row.deltaSign as -1 | 0 | 1,
      thresholds: JSON.parse(row.thresholds as string),
      alertTriggered: (row.alertTriggered as number) === 1,
      alertSeverity: row.alertSeverity as 'warning' | 'critical' | undefined,
      context: JSON.parse(row.context as string),
    };
  }
}
