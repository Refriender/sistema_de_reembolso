/**
 * Header Section Component
 *
 * Seção de cabeçalho da página de lista de reembolsos.
 * Contém o logo da aplicação e botão para criar nova solicitação.
 *
 * Features:
 * - Logo clicável (pode ser usado para navegação futura)
 * - Botão "Nova solicitação" que abre modal de criação
 * - Responsivo: texto do botão muda em mobile
 * - Animação de fade-in ao carregar
 *
 * @example
 * ```tsx
 * <HeaderSection onCreateClick={() => setModalOpen(true)} />
 * ```
 */

import React from "react";
import { Button } from "../../../../components/ui/button";

/**
 * Props do HeaderSection
 */
interface HeaderSectionProps {
  /** Callback executado quando botão "Nova solicitação" é clicado */
  onCreateClick: () => void;
}

/**
 * Header Section Component
 *
 * Renderiza o cabeçalho com logo e ações principais
 */
export const HeaderSection = ({
  onCreateClick,
}: HeaderSectionProps): JSX.Element => {
  return (
    <header className="flex w-full max-w-[1185px] mx-auto justify-between items-center translate-y-[-1rem] animate-fade-in opacity-0">
      {/* Logo da aplicação */}
      <div className="relative w-[80px] sm:w-[101.05px] h-6 sm:h-8 flex-shrink-0">
        {/* Ícone verde (parte do logo) */}
        <img
          className="absolute w-[18.94%] h-[70.37%] top-[13.16%] left-[5.83%]"
          alt="Logo"
          src="/assets/logo.svg"
        />
        {/* Texto "refund" (parte do logo) */}
        <img
          className="absolute top-[9px] left-[35px] w-[60px] h-3.5"
          alt="Refund"
          src="/assets/icons/refund.svg"
        />
      </div>

      {/* Navegação e ações */}
      <nav className="flex items-center gap-2 sm:gap-4">
        {/* Link "Solicitações de reembolso" - visível apenas em desktop */}
        <Button
          variant="link"
          className="hidden sm:inline-flex h-auto px-0 py-0 [font-family:'Open_Sans',Helvetica] font-semibold text-sm tracking-[0] leading-6 no-underline"
        >
          Solicitações de reembolso
        </Button>

        {/* Botão para criar nova solicitação */}
        <Button
          onClick={onCreateClick}
          className="h-10 sm:h-12 px-3 sm:px-5 bg-green-100 hover:bg-green-200 disabled:bg-green-300 disabled:cursor-not-allowed rounded-lg [font-family:'Open_Sans',Helvetica] font-bold text-white text-xs sm:text-sm tracking-[0] leading-[18px] whitespace-nowrap transition-colors"
        >
          {/* Texto completo em desktop */}
          <span className="hidden sm:inline">Nova solicitação</span>
          {/* Texto abreviado em mobile */}
          <span className="sm:hidden">Nova</span>
        </Button>
      </nav>
    </header>
  );
};
