/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [react()],
  test: {
    // Ambiente de teste (jsdom simula o browser)
    environment: "jsdom",
    
    // Arquivo de setup que roda antes de cada teste
    setupFiles: ["./src/test/setup.ts"],
    
    // Habilita globals (describe, it, expect sem import)
    globals: true,
    
    // Padrão de arquivos de teste
    include: ["src/**/*.{test,spec}.{js,ts,jsx,tsx}"],
    
    // Arquivos a ignorar
    exclude: ["node_modules", "dist", "dev-dist"],
    
    // Configuração de cobertura de código
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "src/test/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/index.ts",
      ],
    },
    
    // CSS handling
    css: true,
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
