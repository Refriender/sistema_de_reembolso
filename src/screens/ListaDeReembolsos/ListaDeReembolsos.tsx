/**
 * Lista de Reembolsos Screen
 *
 * Tela principal da aplicação que exibe a lista de reembolsos.
 * Permite criar novos reembolsos através de um modal.
 *
 * Estrutura:
 * - Header com logo e botão "Nova solicitação"
 * - Lista de reembolsos com busca e paginação
 * - Modal de criação de reembolso
 *
 * Esta é a tela inicial da aplicação (rota "/").
 *
 * @example
 * ```tsx
 * // Roteamento no App.tsx
 * <Route path="/" element={<ListaDeReembolsos />} />
 * ```
 */

import React, { useState } from "react";
import { Footer } from "../../components/Footer";
import { SEO } from "../../components/SEO";
import { CreateReimbursementModal } from "./components/CreateReimbursementModal";
import { HeaderSection } from "./sections/HeaderSection";
import { RequestListSection } from "./sections/RequestListSection";

/**
 * Lista de Reembolsos Screen Component
 *
 * Tela principal que orquestra header, lista e modal de criação
 */
export const ListaDeReembolsos = (): JSX.Element => {
  // Estado para controlar abertura/fechamento do modal de criação
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div
      className="min-h-screen w-full flex flex-col bg-gray-400"
      data-model-id="2301:791"
    >
      <SEO
        title="Lista de Solicitações"
        description="Gerencie, visualize e crie novas solicitações de reembolso corporativo de forma simples e rápida."
      />

      {/* Container do header com padding responsivo */}
      <div className="w-full px-3 sm:px-6 lg:px-10 py-4 sm:py-6 md:py-10">
        <HeaderSection onCreateClick={() => setIsCreateModalOpen(true)} />
      </div>

      {/* Container da lista de reembolsos com padding responsivo */}
      <div className="w-full px-3 sm:px-6 lg:px-10 pb-6 sm:pb-10 flex-1">
        <RequestListSection />
      </div>

      {/* Modal de criação de reembolso (renderizado condicionalmente) */}
      <CreateReimbursementModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />

      {/* Rodapé */}
      <Footer />
    </div>
  );
};
