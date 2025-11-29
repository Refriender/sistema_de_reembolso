/**
 * App Component
 *
 * Componente raiz da aplicação que configura:
 * - Roteamento (React Router)
 * - Gerenciamento de estado assíncrono (React Query)
 * - Sistema de notificações (Toast)
 *
 * Estrutura de rotas:
 * - "/" e "/lista-de-reembolsos" → Lista de reembolsos (tela inicial)
 * - "/detalhe-de-reembolso/:id" → Detalhes de um reembolso específico
 * - "/solicitacao-enviada" → Confirmação de sucesso após criar reembolso
 *
 * Providers:
 * - QueryProvider: Fornece React Query para toda a aplicação
 * - RouterProvider: Gerencia navegação entre telas
 * - Toaster: Sistema de notificações toast
 *
 * @example
 * ```tsx
 * // No index.tsx
 * <App />
 * ```
 */

import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "./components/ui/toaster";
import { PWAInstallPrompt } from "./components/PWAInstallPrompt";
import { QueryProvider } from "./contexts/QueryProvider";
import { DetalheDeReembolso } from "./screens/DetalheDeReembolso";
import { ListaDeReembolsos } from "./screens/ListaDeReembolsos";
import { SolicitaoEnviada } from "./screens/SolicitaoEnviada";

/**
 * Configuração de rotas da aplicação
 *
 * Define todas as rotas disponíveis e seus componentes correspondentes
 */
const router = createBrowserRouter([
  {
    // Rota raiz - redireciona para lista de reembolsos
    path: "/",
    element: <ListaDeReembolsos />,
  },
  {
    // Rota da lista de reembolsos (mesma tela que a raiz)
    path: "/lista-de-reembolsos",
    element: <ListaDeReembolsos />,
  },
  {
    // Rota de detalhes com parâmetro dinâmico :id
    path: "/detalhe-de-reembolso/:id",
    element: <DetalheDeReembolso />,
  },
  {
    // Rota de confirmação de sucesso
    path: "/solicitacao-enviada",
    element: <SolicitaoEnviada />,
  },
]);

/**
 * App Component
 *
 * Componente principal que envolve toda a aplicação com providers necessários
 */
export const App = () => {
  return (
    // Provider para gerenciar Meta Tags (SEO)
    <HelmetProvider>
      {/* Provider do React Query para gerenciamento de estado assíncrono */}
      <QueryProvider>
        {/* Provider do React Router para navegação */}
        <RouterProvider router={router} />

        {/* Componente de notificações toast (renderizado globalmente) */}
        <Toaster />

        {/* Prompt de instalação PWA */}
        <PWAInstallPrompt />
      </QueryProvider>
    </HelmetProvider>
  );
};
