/**
 * Constantes de Storage
 *
 * Define as chaves utilizadas no localStorage
 */

/**
 * Chave para armazenar reembolsos no localStorage
 */
export const STORAGE_KEYS = {
  REIMBURSEMENTS: "reimbursements",
} as const;

/**
 * Configurações de validação de arquivos
 */
export const FILE_VALIDATION = {
  /** Tipos de arquivo aceitos */
  ACCEPTED_TYPES: ["image/jpeg", "image/png", "application/pdf"],
  /** Tamanho máximo em bytes (5MB) */
  MAX_SIZE: 5 * 1024 * 1024,
  /** Extensões aceitas */
  ACCEPTED_EXTENSIONS: [".jpg", ".jpeg", ".png", ".pdf"],
} as const;
