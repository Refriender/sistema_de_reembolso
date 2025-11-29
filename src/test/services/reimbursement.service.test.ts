/**
 * Testes do Serviço de Reembolsos
 *
 * Testa operações CRUD do serviço com localStorage mockado
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { reimbursementService } from "../../features/reimbursements/services/reimbursement.service";
import { STORAGE_KEYS } from "../../shared/constants/storage";

// Mock data
const mockReimbursements = [
  {
    id: "1",
    name: "João",
    category: "Alimentação",
    amount: 50.0,
    createdAt: "2024-01-15T00:00:00.000Z",
  },
  {
    id: "2",
    name: "Maria",
    category: "Transporte",
    amount: 100.0,
    createdAt: "2024-01-14T00:00:00.000Z",
  },
  {
    id: "3",
    name: "Pedro",
    category: "Hospedagem",
    amount: 200.0,
    createdAt: "2024-01-13T00:00:00.000Z",
  },
];

describe("reimbursementService", () => {
  beforeEach(() => {
    // Limpa e configura o mock do localStorage
    vi.clearAllMocks();
    (localStorage.getItem as ReturnType<typeof vi.fn>).mockReturnValue(
      JSON.stringify(mockReimbursements)
    );
  });

  describe("getAll", () => {
    it("deve retornar lista paginada de reembolsos", async () => {
      const result = await reimbursementService.getAll(1, 2);

      expect(result.data).toHaveLength(2);
      expect(result.total).toBe(3);
      expect(result.pages).toBe(2);
    });

    it("deve filtrar por nome quando search é fornecido", async () => {
      const result = await reimbursementService.getAll(1, 10, "João");

      expect(result.data).toHaveLength(1);
      expect(result.data[0].name).toBe("João");
    });

    it("deve retornar segunda página corretamente", async () => {
      const result = await reimbursementService.getAll(2, 2);

      expect(result.data).toHaveLength(1);
      expect(result.data[0].name).toBe("Pedro");
    });

    it("deve retornar lista vazia para busca sem resultados", async () => {
      const result = await reimbursementService.getAll(1, 10, "XYZ");

      expect(result.data).toHaveLength(0);
      expect(result.total).toBe(0);
    });
  });

  describe("getById", () => {
    it("deve retornar reembolso pelo ID", async () => {
      const result = await reimbursementService.getById("1");

      expect(result).not.toBeNull();
      expect(result?.name).toBe("João");
    });

    it("deve retornar null para ID inexistente", async () => {
      const result = await reimbursementService.getById("999");

      expect(result).toBeNull();
    });
  });

  describe("create", () => {
    it("deve criar novo reembolso", async () => {
      const newData = {
        name: "Novo Reembolso",
        category: "Serviços",
        amount: 150.0,
      };

      const result = await reimbursementService.create(newData);

      expect(result.name).toBe("Novo Reembolso");
      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeDefined();
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });

  describe("delete", () => {
    it("deve excluir reembolso pelo ID", async () => {
      await reimbursementService.delete("1");

      expect(localStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEYS.REIMBURSEMENTS,
        expect.not.stringContaining('"id":"1"')
      );
    });
  });
});
