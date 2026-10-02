/**
 * Configuration du pipeline de comparaison asynchrone et d'alerting.
 *
 * Les valeurs sont lues depuis les variables d'environnement avec des fallbacks
 * pour l'environnement de développement / test.
 *
 * Variables d'environnement :
 * - DARK_LAUNCH_DELTA_ABSOLUTE_MAX : seuil absolu en € (défaut 5)
 * - DARK_LAUNCH_DELTA_RELATIVE_MAX : seuil relatif en % (défaut 10)
 * - DARK_LAUNCH_ALERTING_ENABLED : active/désactive l'alerting (défaut true)
 * - DARK_LAUNCH_SQLITE_PATH : chemin du fichier SQLite pour la persistance
 *   (défaut : mémoire seule)
 */

export interface DarkLaunchAlertingConfig {
  /** Seuil absolu maximal : si |delta| > ce seuil, alerte déclenchée. */
  deltaAbsoluteMax: number;
  /** Seuil relatif maximal : si deltaRelative > ce seuil, alerte déclenchée. */
  deltaRelativeMax: number;
  /** Active ou désactive l'alerting complet (log + événement). */
  enabled: boolean;
  /** Chemin du fichier SQLite pour la persistance des événements.
   *  Si non défini, la base reste en mémoire (perte au redémarrage). */
  sqlitePath?: string;
}

function parseNumberEnv(name: string, defaultValue: number): number {
  const raw = process.env[name];
  if (raw === undefined) return defaultValue;
  const parsed = Number(raw);
  if (!Number.isFinite(parsed) || parsed < 0) {
    console.warn(`[dark-launch-config] ${name} invalide ("${raw}"), utilisation de la valeur par défaut ${defaultValue}`);
    return defaultValue;
  }
  return parsed;
}

function parseBoolEnv(name: string, defaultValue: boolean): boolean {
  const raw = process.env[name];
  if (raw === undefined) return defaultValue;
  return raw.toLowerCase() !== '0' && raw.toLowerCase() !== 'false' && raw.toLowerCase() !== 'no';
}

export function loadConfig(): DarkLaunchAlertingConfig {
  return {
    deltaAbsoluteMax: parseNumberEnv('DARK_LAUNCH_DELTA_ABSOLUTE_MAX', 5),
    deltaRelativeMax: parseNumberEnv('DARK_LAUNCH_DELTA_RELATIVE_MAX', 10),
    enabled: parseBoolEnv('DARK_LAUNCH_ALERTING_ENABLED', true),
    sqlitePath: process.env.DARK_LAUNCH_SQLITE_PATH,
  };
}

/** Configuration par défaut (usage interne, tests, fallback). */
export const DEFAULT_CONFIG: DarkLaunchAlertingConfig = {
  deltaAbsoluteMax: 5,
  deltaRelativeMax: 10,
  enabled: true,
  sqlitePath: undefined,
};
