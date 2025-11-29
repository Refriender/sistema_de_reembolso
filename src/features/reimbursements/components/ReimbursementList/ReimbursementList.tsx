/**
 * Componente de Lista de Reembolsos
 *
 * Exibe a lista paginada de reembolsos com busca
 */

import { Loader2Icon } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CATEGORY_ICONS } from "../../../../shared/constants/categories";
import {
  StaggerContainer,
  StaggerItem,
} from "../../../../shared/components/Motion";
import { useReimbursements } from "../../hooks/useReimbursements";
import { ReimbursementListItem } from "./ReimbursementListItem";
import { AnimatePresence } from "framer-motion";

interface ReimbursementListProps {
  /** Página atual */
  page: number;
  /** Termo de busca */
  searchQuery: string;
}

/**
 * Componente que renderiza a lista de reembolsos
 */
export const ReimbursementList: React.FC<ReimbursementListProps> = ({
  page,
  searchQuery,
}) => {
  const navigate = useNavigate();
  const { data, isLoading, error } = useReimbursements(page, 6, searchQuery);

  // Estado de carregamento
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2Icon className="w-8 h-8 text-green-100 animate-spin" />
      </div>
    );
  }

  // Estado de erro
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-200">Erro ao carregar reembolsos</p>
      </div>
    );
  }

  // Estado vazio
  if (!data || data.data.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-200">Nenhum reembolso encontrado</p>
      </div>
    );
  }

  // Renderiza lista de reembolsos com animação em cascata
  return (
    <StaggerContainer className="flex flex-col items-start justify-center gap-3 sm:gap-4 w-full">
      <AnimatePresence mode="wait">
        {data.data.map((reimbursement) => (
          <StaggerItem key={reimbursement.id} className="w-full">
            <ReimbursementListItem
              reimbursement={reimbursement}
              icon={
                CATEGORY_ICONS[
                  reimbursement.category as keyof typeof CATEGORY_ICONS
                ]
              }
              onClick={() =>
                navigate(`/detalhe-de-reembolso/${reimbursement.id}`)
              }
            />
          </StaggerItem>
        ))}
      </AnimatePresence>
    </StaggerContainer>
  );
};
