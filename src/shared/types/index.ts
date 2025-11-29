/**
 * Shared Types
 *
 * Tipos compartilhados utilizados em toda a aplicação
 */

/**
 * Interface que representa um reembolso no sistema
 */
export interface Reimbursement {
  /** ID único do reembolso */
  id: string;
  /** Nome do solicitante */
  name: string;
  /** Categoria da despesa */
  category: string;
  /** Valor da despesa em reais */
  amount: number;
  /** URL do comprovante em formato data URL */
  receipt?: string;
  /** Nome do arquivo do comprovante */
  receiptName?: string;
  /** Data de criação do reembolso */
  createdAt: string;
}

/**
 * Resposta paginada da API de reembolsos
 */
export interface PaginatedResponse<T> {
  /** Dados da página atual */
  data: T[];
  /** Total de registros */
  total: number;
  /** Total de páginas */
  pages: number;
}

/**
 * Categorias disponíveis para reembolso
 */
export type ReimbursementCategory =
  | "Alimentação"
  | "Hospedagem"
  | "Transporte"
  | "Serviços"
  | "Outros";
