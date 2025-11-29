/**
 * Utility Functions
 *
 * Funções utilitárias compartilhadas em toda a aplicação.
 * Atualmente contém apenas a função `cn` para merge de classes CSS.
 */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn (className) Function
 *
 * Combina múltiplas classes CSS de forma inteligente,
 * resolvendo conflitos do Tailwind CSS.
 *
 * Usa clsx para concatenar classes condicionalmente e
 * tailwind-merge para resolver conflitos de classes do Tailwind.
 *
 * @param inputs - Classes CSS para combinar (strings, objetos, arrays)
 * @returns String com classes combinadas e sem conflitos
 *
 * @example
 * ```tsx
 * // Básico
 * cn("px-4 py-2", "bg-blue-500")
 * // => "px-4 py-2 bg-blue-500"
 *
 * // Com condicionais
 * cn("px-4", isActive && "bg-blue-500", !isActive && "bg-gray-500")
 * // => "px-4 bg-blue-500" (se isActive = true)
 *
 * // Resolvendo conflitos do Tailwind
 * cn("px-4 py-2", "px-6")
 * // => "py-2 px-6" (px-6 sobrescreve px-4)
 *
 * // Com objetos
 * cn("px-4", { "bg-blue-500": isActive, "bg-gray-500": !isActive })
 *
 * // Com arrays
 * cn(["px-4", "py-2"], isActive && ["bg-blue-500", "text-white"])
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
