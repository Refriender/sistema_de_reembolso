/**
 * Utilitários de Formatação
 *
 * Funções auxiliares para formatação de dados
 */

/**
 * Formata um número para o formato de moeda brasileira
 * @param amount - Valor a ser formatado
 * @returns String formatada (ex: "1.234,56")
 */
export const formatCurrency = (amount: number): string => {
  return amount.toFixed(2).replace(".", ",");
};

/**
 * Converte string de moeda para número
 * @param value - String no formato "1.234,56" ou "1234.56"
 * @returns Número convertido
 */
export const parseCurrency = (value: string): number => {
  return parseFloat(value.replace(",", "."));
};

/**
 * Formata uma data para o formato brasileiro
 * @param date - Data a ser formatada
 * @returns String formatada (ex: "01/01/2024")
 */
export const formatDate = (date: string | Date): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("pt-BR");
};
