/**
 * Label Component
 *
 * Componente de label para formulários usando Radix UI.
 * Automaticamente associado a inputs quando usado corretamente.
 *
 * Features:
 * - Muda de cor para verde quando input associado está focado
 * - Cursor not-allowed quando input está disabled
 * - Transições suaves de cor
 *
 * @example
 * ```tsx
 * <Label htmlFor="email">Email</Label>
 * <Input id="email" type="email" />
 * ```
 */

import * as LabelPrimitive from "@radix-ui/react-label";
import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";
import { cn } from "../../lib/utils";

/**
 * Variantes do label usando CVA
 *
 * peer-focus:text-green-100 - Fica verde quando input irmão (peer) está focado
 * peer-disabled:cursor-not-allowed - Cursor muda quando input está disabled
 */
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors peer-focus:text-green-100"
);

/**
 * Label Component
 * Renderiza um label acessível e estilizado
 */
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
