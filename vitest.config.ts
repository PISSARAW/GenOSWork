import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: { alias: { "@": path.resolve(__dirname, ".") } },
  test: {
    globals: true,
    environment: "node",
    include: ["src/dark-launch/**/*.test.ts", "src/site-integrity/**/*.test.ts"],
    // Désactiver le timeout par défaut pour les tests asynchrones.
    testTimeout: 10_000,
    // Rapport console pour voir les logs.
    reporters: ["default"],
  },
});
