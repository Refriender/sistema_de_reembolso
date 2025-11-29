/**
 * Testes das Funções de Arquivo
 *
 * Testa validações e conversões de arquivos
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  isValidFileType,
  isValidFileSize,
  fileToDataUrl,
} from "../../shared/utils/file";

describe("isValidFileType", () => {
  it("deve aceitar arquivos JPEG", () => {
    const file = new File([""], "test.jpg", { type: "image/jpeg" });
    expect(isValidFileType(file)).toBe(true);
  });

  it("deve aceitar arquivos PNG", () => {
    const file = new File([""], "test.png", { type: "image/png" });
    expect(isValidFileType(file)).toBe(true);
  });

  it("deve aceitar arquivos PDF", () => {
    const file = new File([""], "test.pdf", { type: "application/pdf" });
    expect(isValidFileType(file)).toBe(true);
  });

  it("deve rejeitar arquivos GIF", () => {
    const file = new File([""], "test.gif", { type: "image/gif" });
    expect(isValidFileType(file)).toBe(false);
  });

  it("deve rejeitar arquivos de texto", () => {
    const file = new File([""], "test.txt", { type: "text/plain" });
    expect(isValidFileType(file)).toBe(false);
  });

  it("deve rejeitar arquivos executáveis", () => {
    const file = new File([""], "test.exe", {
      type: "application/x-msdownload",
    });
    expect(isValidFileType(file)).toBe(false);
  });
});

describe("isValidFileSize", () => {
  it("deve aceitar arquivos menores que 5MB", () => {
    const file = new File([new ArrayBuffer(1024 * 1024)], "test.jpg"); // 1MB
    expect(isValidFileSize(file)).toBe(true);
  });

  it("deve aceitar arquivos de exatamente 5MB", () => {
    const file = new File([new ArrayBuffer(5 * 1024 * 1024)], "test.jpg"); // 5MB
    expect(isValidFileSize(file)).toBe(true);
  });

  it("deve rejeitar arquivos maiores que 5MB", () => {
    const file = new File([new ArrayBuffer(6 * 1024 * 1024)], "test.jpg"); // 6MB
    expect(isValidFileSize(file)).toBe(false);
  });

  it("deve aceitar arquivos vazios", () => {
    const file = new File([""], "test.jpg");
    expect(isValidFileSize(file)).toBe(true);
  });
});

describe("fileToDataUrl", () => {
  beforeEach(() => {
    // Reset do FileReader mock
    vi.restoreAllMocks();
  });

  it("deve converter arquivo para data URL", async () => {
    const content = "test content";
    const file = new File([content], "test.txt", { type: "text/plain" });

    const result = await fileToDataUrl(file);

    expect(result).toContain("data:");
    expect(result).toContain("base64");
  });

  it("deve retornar data URL válida para imagem", async () => {
    // Cria um arquivo de imagem simples
    const file = new File(["fake image data"], "test.png", {
      type: "image/png",
    });

    const result = await fileToDataUrl(file);

    expect(result.startsWith("data:image/png;base64,")).toBe(true);
  });
});
