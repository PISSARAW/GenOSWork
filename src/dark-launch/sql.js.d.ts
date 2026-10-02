declare module 'sql.js' {
  export interface Database {
    run(sql: string, params?: unknown[]): Database;
    exec(sql: string): { columns: string[]; values: unknown[][] }[];
    prepare(sql: string): Statement;
    close(): void;
    export(): Uint8Array;
  }
  export interface Statement {
    bind(params: unknown[]): boolean;
    step(): boolean;
    run(params?: unknown[]): Database;
    getAsObject(): Record<string, unknown>;
    free(): boolean;
  }
  export default function initSqlJs(config?: unknown): Promise<{
    Database: new () => Database;
  }>;
}
