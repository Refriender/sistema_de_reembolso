/**
 * Solicitação Enviada Screen
 *
 * Tela de confirmação exibida após criar um reembolso com sucesso.
 * Mostra mensagem de sucesso e permite voltar para a lista.
 *
 * Features:
 * - Ícone de sucesso (checkmark verde)
 * - Mensagem informativa
 * - Botão para voltar à lista de reembolsos
 * - Animações de entrada
 * - Totalmente responsivo
 *
 * Navegação:
 * - Usuário é redirecionado aqui após criar reembolso
 * - Pode voltar para lista clicando em "Ver solicitações" ou "Voltar"
 *
 * @example
 * ```tsx
 * // Redirecionamento após criar reembolso
 * navigate("/solicitacao-enviada");
 * ```
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/Footer";
import { SEO } from "../../components/SEO";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

/**
 * Solicitação Enviada Screen Component
 *
 * Tela de feedback de sucesso após criação de reembolso
 */
export const SolicitaoEnviada = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full flex flex-col bg-gray-400"
      data-model-id="2301:648"
    >
      <SEO
        title="Solicitação Enviada"
        description="Sua solicitação de reembolso foi enviada com sucesso e está em análise."
      />

      {/* Header com logo e navegação */}
      <header className="w-full px-4 sm:px-6 lg:px-10 py-6 sm:py-10">
        <div className="flex mx-auto w-full max-w-[1185px] items-center justify-between translate-y-[-1rem] animate-fade-in opacity-0">
          {/* Logo clicável */}
          <div className="relative w-[80px] sm:w-[101.05px] h-6 sm:h-8 flex-shrink-0">
            <img
              className="absolute w-[18.94%] h-[70.37%] top-[13.16%] left-[5.83%]"
              alt="Logo"
              src="/assets/logo.svg"
            />
            <img
              className="absolute top-[9px] left-[35px] w-[60px] h-3.5"
              alt="Refund"
              src="/assets/icons/refund.svg"
            />
          </div>

          {/* Botão Voltar */}
          <nav className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="link"
              onClick={() => navigate("/lista-de-reembolsos")}
              className="h-auto px-0 py-0 [font-family:'Open_Sans',Helvetica] font-semibold text-xs sm:text-sm tracking-[0] leading-6 whitespace-nowrap no-underline"
            >
              Voltar
            </Button>
          </nav>
        </div>
      </header>

      {/* Conteúdo principal com card de sucesso */}
      <main className="flex justify-center items-start px-4 sm:px-6 lg:px-10 pb-6 sm:pb-10 flex-1 translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
        <Card className="w-full max-w-[512px] bg-gray-500 rounded-2xl border-0 shadow-sm">
          <CardContent className="flex flex-col items-start gap-6 sm:gap-8 md:gap-10 p-5 sm:p-6 md:p-10">
            {/* Container centralizado com mensagem de sucesso */}
            <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 w-full">
              {/* Título de sucesso */}
              <h1 className="[font-family:'Open_Sans',Helvetica] font-bold text-green-100 text-xl sm:text-2xl text-center tracking-[0] leading-6">
                Solicitação enviada!
              </h1>

              {/* Ícone de sucesso (checkmark verde) */}
              <img
                className="w-[90px] h-[90px] sm:w-[110px] sm:h-[110px]"
                alt="Success checkmark"
                src="/assets/icons/success.svg"
              />

              {/* Mensagem informativa */}
              <p className="[font-family:'Open_Sans',Helvetica] font-normal text-gray-200 text-xs sm:text-sm text-center tracking-[0] leading-[normal]">
                Agora é apenas aguardar! Sua solicitação será analisada e, em
                breve, o setor financeiro irá entrar em contato com você.
              </p>
            </div>

            {/* Botão para voltar à lista */}
            <Button
              onClick={() => navigate("/lista-de-reembolsos")}
              className="w-full h-10 sm:h-12 gap-2 px-4 sm:px-5 py-0 bg-green-100 hover:bg-green-200 disabled:bg-green-300 disabled:cursor-not-allowed rounded-lg transition-colors"
            >
              <span className="[font-family:'Open_Sans',Helvetica] font-bold text-white text-xs sm:text-sm text-center tracking-[0] leading-[18px]">
                Ver solicitações
              </span>
            </Button>
          </CardContent>
        </Card>
      </main>

      {/* Rodapé */}
      <Footer />
    </div>
  );
};
