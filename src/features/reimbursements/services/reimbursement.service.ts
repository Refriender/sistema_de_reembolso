/**
 * Serviço de Reembolsos
 *
 * Gerencia todas as operações relacionadas a reembolsos,
 * incluindo CRUD e persistência no localStorage
 */

import { STORAGE_KEYS } from "../../../shared/constants/storage";
import { PaginatedResponse, Reimbursement } from "../../../shared/types";
import { mockDataService } from "./mock-data.service";

/**
 * Simula delay de rede para tornar a experiência mais realista
 * @param ms - Milissegundos de delay
 */
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Inicializa o localStorage com dados mockados se estiver vazio
 */
const initializeStorage = async (): Promise<void> => {
  const stored = localStorage.getItem(STORAGE_KEYS.REIMBURSEMENTS);
  if (!stored) {
    const mockData = await mockDataService.generateMockData();
    localStorage.setItem(STORAGE_KEYS.REIMBURSEMENTS, JSON.stringify(mockData));
  }
};

/**
 * Recupera todos os reembolsos do localStorage
 */
const getStoredReimbursements = async (): Promise<Reimbursement[]> => {
  await initializeStorage();
  const stored = localStorage.getItem(STORAGE_KEYS.REIMBURSEMENTS);
  return stored ? JSON.parse(stored) : [];
};

/**
 * Salva reembolsos no localStorage
 */
const saveReimbursements = (reimbursements: Reimbursement[]): void => {
  localStorage.setItem(
    STORAGE_KEYS.REIMBURSEMENTS,
    JSON.stringify(reimbursements)
  );
};

/**
 * Serviço de API de reembolsos
 */
export const reimbursementService = {
  /**
   * Busca reembolsos com paginação e filtro
   * @param page - Número da página (começa em 1)
   * @param limit - Quantidade de itens por página
   * @param search - Termo de busca (opcional)
   * @returns Resposta paginada com reembolsos
   */
  getAll: async (
    page: number = 1,
    limit: number = 6,
    search?: string
  ): Promise<PaginatedResponse<Reimbursement>> => {
    await delay(300);
    let reimbursements = await getStoredReimbursements();

    // Aplica filtro de busca se fornecido
    if (search) {
      reimbursements = reimbursements.filter((r) =>
        r.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Calcula paginação
    const total = reimbursements.length;
    const pages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const data = reimbursements.slice(start, end);

    return { data, total, pages };
  },

  /**
   * Busca um reembolso específico por ID
   * @param id - ID do reembolso
   * @returns Reembolso encontrado ou null
   */
  getById: async (id: string): Promise<Reimbursement | null> => {
    await delay(200);
    const reimbursements = await getStoredReimbursements();
    return reimbursements.find((r) => r.id === id) || null;
  },

  /**
   * Cria um novo reembolso
   * @param data - Dados do reembolso (sem id e createdAt)
   * @returns Reembolso criado
   */
  create: async (
    data: Omit<Reimbursement, "id" | "createdAt">
  ): Promise<Reimbursement> => {
    await delay(500);
    const reimbursements = await getStoredReimbursements();

    // Cria novo reembolso com ID e data de criação
    const newReimbursement: Reimbursement = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };

    // Adiciona no início da lista
    reimbursements.unshift(newReimbursement);
    saveReimbursements(reimbursements);

    return newReimbursement;
  },

  /**
   * Exclui um reembolso
   * @param id - ID do reembolso a ser excluído
   */
  delete: async (id: string): Promise<void> => {
    await delay(300);
    const reimbursements = await getStoredReimbursements();
    const filtered = reimbursements.filter((r) => r.id !== id);
    saveReimbursements(filtered);
  },
};
