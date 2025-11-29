/**
 * Testes das Funções de Formatação
 *
 * Testa formatadores de moeda e data
 */

import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  parseCurrency,
  formatDate,
} from "../../shared/utils/format";

describe("formatCurrency", () => {
  it("deve formatar número inteiro corretamente", () => {
    expect(formatCurrency(100)).toBe("100,00");
  });

  it("deve formatar número com decimais corretamente", () => {
    expect(formatCurrency(34.78)).toBe("34,78");
  });

  it("deve formatar número grande corretamente", () => {
    expect(formatCurrency(1234.56)).toBe("1234,56");
  });

  it("deve formatar zero corretamente", () => {
    expect(formatCurrency(0)).toBe("0,00");
  });

  it("deve arredondar para 2 casas decimais", () => {
    expect(formatCurrency(10.999)).toBe("11,00");
    expect(formatCurrency(10.994)).toBe("10,99");
  });
});

describe("parseCurrency", () => {
  it("deve converter string com vírgula para número", () => {
    expect(parseCurrency("34,78")).toBe(34.78);
  });

  it("deve converter string com ponto para número", () => {
    expect(parseCurrency("34.78")).toBe(34.78);
  });

  it("deve converter número inteiro como string", () => {
    expect(parseCurrency("100")).toBe(100);
  });

  it("deve retornar NaN para string inválida", () => {
    expect(parseCurrency("abc")).toBeNaN();
  });
});

describe("formatDate", () => {
  it("deve formatar data ISO string corretamente", () => {
    // Usar data local para evitar problemas de timezone
    const result = formatDate("2024-01-15T12:00:00.000Z");
    expect(result).toMatch(/\d{2}\/01\/2024/);
  });

  it("deve formatar objeto Date corretamente", () => {
    const date = new Date(2024, 0, 15); // Janeiro é mês 0
    const result = formatDate(date);
    expect(result).toBe("15/01/2024");
  });

  it("deve formatar data com hora corretamente", () => {
    const result = formatDate("2024-03-20T14:30:00.000Z");
    expect(result).toMatch(/20\/03\/2024/);
  });
});
