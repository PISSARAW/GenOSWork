import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["src/dark-launch/**/*.test.ts"],
    // Désactiver le timeout par défaut pour les tests asynchrones.
    testTimeout: 10_000,
    // Rapport console pour voir les logs.
    reporters: ["default"],
  },
});
