/**
 * Request List Section Component
 *
 * Seção principal que exibe a lista de reembolsos com funcionalidades de:
 * - Busca por nome do solicitante
 * - Paginação (6 itens por página)
 * - Estados de loading, erro e lista vazia
 * - Navegação para página de detalhes ao clicar em um item
 *
 * Usa React Query para gerenciar o estado assíncrono e cache.
 *
 * @example
 * ```tsx
 * <RequestListSection />
 * ```
 */

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Loader2Icon,
  SearchIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useReimbursements } from "../../../../features/reimbursements/hooks";
import { CATEGORY_ICONS } from "../../../../shared/constants/categories";
import { useDebounce } from "../../../../shared/hooks/useDebounce";
import { formatCurrency } from "../../../../shared/utils/format";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";

/**
 * Request List Section Component
 *
 * Gerencia a listagem, busca e paginação de reembolsos
 */
export const RequestListSection = (): JSX.Element => {
  const navigate = useNavigate();

  // Estado da paginação (página atual)
  const [page, setPage] = useState(1);

  // Estado do input de busca (valor digitado)
  const [searchInput, setSearchInput] = useState("");

  // Valor de busca com debounce (500ms) para evitar sobrecarga no servidor
  const debouncedSearch = useDebounce(searchInput, 500);

  // Reseta para primeira página sempre que o termo de busca mudar
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  /**
   * Hook customizado para buscar reembolsos
   * Substitui a chamada direta à API e useQuery
   */
  const { data, isLoading, error } = useReimbursements(
    page,
    6,
    debouncedSearch
  );

  return (
    <section className="flex flex-col items-center justify-center gap-3 sm:gap-4 md:gap-6 p-3 sm:p-4 md:p-6 lg:p-10 bg-gray-500 rounded-xl sm:rounded-2xl w-full max-w-[1185px] mx-auto opacity-0 animate-fade-in [--animation-delay:200ms]">
      {/* Título da seção */}
      <h1 className="[font-family:'Open_Sans',Helvetica] font-bold text-gray-100 text-base sm:text-lg md:text-xl tracking-[0] leading-5 self-start">
        Solicitações
      </h1>

      {/* Header com campo de busca */}
      <header className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-0 pb-4 sm:pb-6 w-full bg-transparent border-b border-solid border-[#e4ebe8]">
        <div className="flex gap-2 sm:gap-3 flex-1 items-center">
          {/* Input de busca */}
          <Input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Pesquisar pelo nome"
            className="h-10 sm:h-12 pl-3 sm:pl-4 pr-3 sm:pr-4 rounded-lg border border-solid border-[#cdd4d1] [font-family:'Open_Sans',Helvetica] font-normal text-gray-200 text-xs sm:text-sm peer"
          />

          {/* Botão de busca (apenas visual, a busca é automática) */}
          <Button
            size="icon"
            className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 hover:bg-green-200 disabled:bg-green-300 disabled:cursor-not-allowed rounded-lg transition-colors flex-shrink-0"
          >
            <SearchIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </Button>
        </div>
      </header>

      {/* Estado de carregamento */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2Icon className="w-8 h-8 text-green-100 animate-spin" />
        </div>
      ) : error ? (
        /* Estado de erro */
        <div className="text-center py-12">
          <p className="text-gray-200">Erro ao carregar reembolsos</p>
        </div>
      ) : data?.data.length === 0 ? (
        /* Estado vazio (sem resultados) */
        <div className="text-center py-12">
          <p className="text-gray-200">Nenhum reembolso encontrado</p>
        </div>
      ) : (
        /* Lista de reembolsos e paginação */
        <>
          {/* Lista de reembolsos */}
          <div className="flex flex-col items-start justify-center gap-3 sm:gap-4 w-full">
            {data?.data.map((request) => (
              <div
                key={request.id}
                onClick={() => navigate(`/detalhe-de-reembolso/${request.id}`)}
                className="flex items-center justify-between px-2 sm:px-3 py-2 sm:py-3 w-full cursor-pointer hover:bg-gray-400/50 rounded-lg transition-colors"
              >
                {/* Informações do reembolso (avatar, nome, categoria) */}
                <div className="inline-flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  {/* Avatar com ícone da categoria */}
                  <Avatar className="w-[30px] h-[30px] sm:w-[34px] sm:h-[34px] bg-gray-400 flex-shrink-0 items-center justify-center">
                    <AvatarImage
                      src={
                        CATEGORY_ICONS[
                          request.category as keyof typeof CATEGORY_ICONS
                        ]
                      }
                      alt={request.name}
                      className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]"
                    />
                    <AvatarFallback className="bg-gray-400">
                      <img
                        className="w-[18px] h-[18px]"
                        alt="Icon"
                        src={
                          CATEGORY_ICONS[
                            request.category as keyof typeof CATEGORY_ICONS
                          ]
                        }
                      />
                    </AvatarFallback>
                  </Avatar>

                  {/* Nome e categoria */}
                  <div className="inline-flex flex-col items-start justify-center min-w-0 flex-1">
                    {/* Nome do solicitante */}
                    <div className="font-heading-sm font-[number:var(--heading-sm-font-weight)] text-gray-100 text-xs sm:text-[length:var(--heading-sm-font-size)] tracking-[var(--heading-sm-letter-spacing)] leading-[var(--heading-sm-line-height)] [font-style:var(--heading-sm-font-style)] truncate w-full">
                      {request.name}
                    </div>

                    {/* Categoria */}
                    <div className="font-body-sm font-[number:var(--body-sm-font-weight)] text-gray-200 text-[10px] sm:text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
                      {request.category}
                    </div>
                  </div>
                </div>

                {/* Valor do reembolso */}
                <div className="inline-flex items-baseline gap-0.5 sm:gap-1 flex-shrink-0 ml-2">
                  {/* Símbolo R$ */}
                  <div className="font-body-sm font-[number:var(--body-sm-font-weight)] text-gray-200 text-[10px] sm:text-[length:var(--body-sm-font-size)] text-right tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
                    R$
                  </div>

                  {/* Valor formatado */}
                  <div className="font-subheading font-[number:var(--subheading-font-weight)] text-gray-100 text-xs sm:text-[length:var(--subheading-font-size)] text-right tracking-[var(--subheading-letter-spacing)] leading-[var(--subheading-line-height)] [font-style:var(--subheading-font-style)] whitespace-nowrap">
                    {formatCurrency(request.amount)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controles de paginação (apenas se houver mais de 1 página) */}
          {data && data.pages > 1 && (
            <div className="inline-flex gap-2 sm:gap-2.5 items-center">
              {/* Botão página anterior */}
              <Button
                size="icon"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="w-7 h-7 sm:w-8 sm:h-8 bg-green-100 hover:bg-green-200 disabled:bg-green-300 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                <ChevronLeftIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </Button>

              {/* Indicador de página atual / total */}
              <div className="[font-family:'Open_Sans',Helvetica] font-normal text-gray-200 text-xs sm:text-sm tracking-[0] leading-5 whitespace-nowrap min-w-[40px] text-center">
                {page}/{data.pages}
              </div>

              {/* Botão próxima página */}
              <Button
                size="icon"
                onClick={() => setPage((p) => Math.min(data.pages, p + 1))}
                disabled={page === data.pages}
                className="w-7 h-7 sm:w-8 sm:h-8 bg-green-100 hover:bg-green-200 disabled:bg-green-300 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                <ChevronRightIcon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </Button>
            </div>
          )}
        </>
      )}
    </section>
  );
};
