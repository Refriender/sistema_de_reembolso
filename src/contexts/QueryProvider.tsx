/**
 * Query Provider Component
 *
 * Provider do React Query para gerenciamento de estado assíncrono.
 * Configura o QueryClient com opções otimizadas para a aplicação.
 *
 * Benefícios do React Query:
 * - Cache automático de requisições
 * - Refetch inteligente
 * - Estados de loading/error gerenciados
 * - Invalidação de cache
 * - Otimistic updates
 *
 * @example
 * ```tsx
 * // No App.tsx
 * <QueryProvider>
 *   <YourApp />
 * </QueryProvider>
 * ```
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

/**
 * Configuração do QueryClient
 *
 * Define comportamentos padrão para todas as queries da aplicação
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      /**
       * refetchOnWindowFocus: false
       * Desabilita refetch automático quando usuário volta para a aba
       * Útil para evitar requisições desnecessárias
       */
      refetchOnWindowFocus: false,

      /**
       * retry: 1
       * Tenta novamente apenas 1 vez em caso de erro
       * Evita múltiplas tentativas que podem sobrecarregar a API
       */
      retry: 1,

      /**
       * staleTime: 5 minutos
       * Dados são considerados "frescos" por 5 minutos
       * Evita refetch desnecessário de dados recentes
       */
      staleTime: 5 * 60 * 1000,
    },
  },
});

/**
 * Query Provider Component
 *
 * Wrapper que fornece o QueryClient para toda a árvore de componentes
 */
export const QueryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
