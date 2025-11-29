/**
 * Constantes de Categorias
 *
 * Define as categorias disponíveis e seus ícones correspondentes
 */

import { ReimbursementCategory } from "../types";

/**
 * Mapeamento de categorias para seus respectivos ícones
 */
export const CATEGORY_ICONS: Record<ReimbursementCategory, string> = {
  Alimentação: "/assets/icons/food.svg",
  Hospedagem: "/assets/icons/hosting.svg",
  Transporte: "/assets/icons/transport.svg",
  Serviços: "/assets/icons/service.svg",
  Outros: "/assets/icons/other.svg",
};

/**
 * Lista de todas as categorias disponíveis
 */
export const CATEGORIES: ReimbursementCategory[] = [
  "Alimentação",
  "Hospedagem",
  "Transporte",
  "Serviços",
  "Outros",
];
