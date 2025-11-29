/**
 * Input Component
 *
 * Componente de campo de entrada de texto estilizado.
 * Suporta todos os tipos de input HTML nativos.
 * Inclui estados de focus, disabled e validação visual.
 *
 * Features:
 * - Focus ring verde quando ativo
 * - Label fica verde quando input está focado (usando classe 'peer')
 * - Suporta file upload
 * - Totalmente acessível
 *
 * @example
 * ```tsx
 * <Input type="text" placeholder="Enter name" />
 * <Input type="email" disabled />
 * <Input type="file" accept=".pdf" />
 * ```
 */

import * as React from "react";
import { cn } from "../../lib/utils";

/**
 * Input Component
 * Campo de entrada com estilos consistentes e estados visuais
 *
 * Classe 'peer' permite que labels irmãos reajam ao estado de focus
 * usando peer-focus: no Tailwind CSS
 */
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Layout e dimensões
          "flex h-9 w-full rounded-md px-3 py-1",
          // Borda e background
          "border border-[#cdd4d1] bg-transparent",
          // Tipografia
          "text-base md:text-sm",
          // Sombra e transições
          "shadow-sm transition-all",
          // Estados de file input
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          // Placeholder
          "placeholder:text-gray-200",
          // Estado de focus (anel verde)
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-100 focus-visible:border-green-100",
          // Estado disabled
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Classe peer para interação com labels
          "peer",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
