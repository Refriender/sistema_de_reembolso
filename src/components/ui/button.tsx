/**
 * Button Component
 *
 * Componente de botão altamente customizável com múltiplas variantes e tamanhos.
 * Suporta estados de hover, focus, disabled e diferentes estilos visuais.
 *
 * @example
 * ```tsx
 * <Button variant="default" size="lg">Click me</Button>
 * <Button variant="outline" disabled>Disabled</Button>
 * ```
 */

import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

/**
 * Variantes de estilo do botão usando CVA (Class Variance Authority)
 * Define todas as combinações possíveis de variantes e tamanhos
 */
const buttonVariants = cva(
  // Classes base aplicadas a todos os botões
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      // Variantes de estilo visual
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        // Link com estados de hover e active personalizados
        link: "text-green-100 underline-offset-4 hover:text-green-200 active:text-green-100 transition-colors",
      },
      // Variantes de tamanho
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9", // Tamanho quadrado para botões com apenas ícone
      },
    },
    // Valores padrão quando não especificados
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

/**
 * Interface de props do Button
 * Estende props nativas do button HTML e adiciona variantes do CVA
 */
export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Se true, renderiza o filho como elemento raiz (útil para links) */
  asChild?: boolean;
}

/**
 * Button Component
 * Renderiza um botão ou slot dependendo da prop asChild
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Usa Slot se asChild for true, permitindo composição com outros elementos
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// eslint-disable-next-line react-refresh/only-export-components
export { Button, buttonVariants };
