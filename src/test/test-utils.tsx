/**
 * Test Utils
 *
 * Utilitários para facilitar a escrita de testes.
 * Inclui render customizado com providers necessários.
 */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import React, { ReactElement } from "react";

/**
 * Cria um QueryClient para testes
 * Desabilita retries e configura para testes
 */
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

/**
 * Props customizadas para o render
 */
interface CustomRenderOptions extends Omit<RenderOptions, "wrapper"> {
  route?: string;
}

/**
 * Render customizado que envolve o componente com todos os providers
 */
const customRender = (
  ui: ReactElement,
  { route = "/", ...options }: CustomRenderOptions = {}
) => {
  // Define a rota inicial
  window.history.pushState({}, "Test page", route);

  // Cria um novo QueryClient para cada teste
  const testQueryClient = createTestQueryClient();

  // Wrapper com todos os providers necessários
  const AllProviders = ({ children }: { children: React.ReactNode }) => (
    <HelmetProvider>
      <QueryClientProvider client={testQueryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    </HelmetProvider>
  );

  return {
    ...render(ui, { wrapper: AllProviders, ...options }),
    queryClient: testQueryClient,
  };
};

// Re-exporta tudo do testing-library
// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
export { userEvent } from "@testing-library/user-event";

// Exporta o render customizado como default
export { customRender as render };
