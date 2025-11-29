/**
 * useToast Hook
 *
 * Hook customizado para gerenciar notificações toast na aplicação.
 * Implementa um sistema de gerenciamento de estado global para toasts
 * usando o padrão reducer.
 *
 * Features:
 * - Múltiplos toasts simultâneos (limitado a 1 por padrão)
 * - Auto-dismiss após timeout
 * - Controle manual de dismiss
 * - Atualização de toasts existentes
 * - Variantes (success, error, default)
 *
 * @example
 * ```tsx
 * const { toast } = useToast();
 *
 * toast({
 *   title: "Sucesso!",
 *   description: "Operação concluída",
 *   variant: "success"
 * });
 * ```
 */

import * as React from "react";
import type { ToastActionElement, ToastProps } from "../components/ui/toast";

// Limite de toasts simultâneos na tela
const TOAST_LIMIT = 1;

// Tempo antes de remover toast do DOM (em ms)
const TOAST_REMOVE_DELAY = 1000000;

/**
 * Tipo estendido de Toast com propriedades adicionais
 */
type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

/**
 * Tipos de ações disponíveis no reducer
 */
const _actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

// Contador para gerar IDs únicos
let count = 0;

/**
 * Gera ID único para cada toast
 */
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof _actionTypes;

/**
 * Union type de todas as ações possíveis
 */
type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: ToasterToast["id"];
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: ToasterToast["id"];
    };

/**
 * Estado do gerenciador de toasts
 */
interface State {
  toasts: ToasterToast[];
}

// Map para gerenciar timeouts de remoção
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

/**
 * Adiciona toast à fila de remoção
 * Toast será removido do DOM após TOAST_REMOVE_DELAY
 */
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

/**
 * Reducer para gerenciar estado dos toasts
 * Implementa lógica para adicionar, atualizar, dismissar e remover toasts
 */
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      // Adiciona novo toast, respeitando o limite
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      // Atualiza toast existente por ID
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      // Adiciona toast(s) à fila de remoção
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        // Se não especificou ID, dismissa todos
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      // Marca toast(s) como fechado(s)
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }

    case "REMOVE_TOAST":
      // Remove toast do estado
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

// Array de listeners para mudanças de estado
const listeners: Array<(state: State) => void> = [];

// Estado em memória (fora do React)
let memoryState: State = { toasts: [] };

/**
 * Dispatch de ações
 * Atualiza estado e notifica todos os listeners
 */
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type Toast = Omit<ToasterToast, "id">;

/**
 * Função para criar um novo toast
 *
 * @param props - Propriedades do toast (title, description, variant, etc)
 * @returns Objeto com métodos para controlar o toast
 */
function toast({ ...props }: Toast) {
  const id = genId();

  // Função para atualizar toast existente
  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });

  // Função para dismissar toast
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  // Adiciona toast ao estado
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) {
          dismiss();
        }
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

/**
 * Hook useToast
 *
 * Fornece acesso ao estado dos toasts e função para criar novos toasts
 *
 * @returns Estado dos toasts e funções de controle
 */
function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  // Registra listener para mudanças de estado
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast };
