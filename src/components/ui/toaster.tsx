/**
 * Toaster Component
 *
 * Componente que renderiza todos os toasts ativos na tela.
 * Gerencia a exibição de múltiplas notificações simultaneamente.
 *
 * Funciona em conjunto com o hook useToast para exibir mensagens
 * de feedback ao usuário (sucesso, erro, informação).
 *
 * @example
 * ```tsx
 * // No App.tsx
 * <App>
 *   <YourComponents />
 *   <Toaster />
 * </App>
 * ```
 */

import { useToast } from "../../hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "./toast";

/**
 * Toaster Component
 *
 * Renderiza todos os toasts ativos usando o estado do useToast.
 * Cada toast é renderizado com seu título, descrição e ações.
 */
export function Toaster() {
  // Obtém lista de toasts ativos do hook
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {/* Mapeia e renderiza cada toast ativo */}
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            {/* Container do conteúdo do toast */}
            <div className="grid gap-1">
              {/* Título do toast (opcional) */}
              {title && <ToastTitle>{title}</ToastTitle>}

              {/* Descrição/mensagem do toast (opcional) */}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>

            {/* Ação customizada (botão, link, etc) */}
            {action}

            {/* Botão X para fechar o toast */}
            <ToastClose />
          </Toast>
        );
      })}

      {/* Container onde os toasts aparecem na tela */}
      <ToastViewport />
    </ToastProvider>
  );
}
