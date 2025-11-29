/**
 * Componente de Item da Lista de Reembolsos
 *
 * Representa um único item na lista de reembolsos
 */

import React from "react";
import { motion } from "framer-motion";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../../../components/ui/avatar";
import { Reimbursement } from "../../../../shared/types";
import { formatCurrency } from "../../../../shared/utils/format";

interface ReimbursementListItemProps {
  /** Dados do reembolso */
  reimbursement: Reimbursement;
  /** URL do ícone da categoria */
  icon: string;
  /** Callback ao clicar no item */
  onClick: () => void;
}

/**
 * Componente que renderiza um item da lista
 */
export const ReimbursementListItem: React.FC<ReimbursementListItemProps> = ({
  reimbursement,
  icon,
  onClick,
}) => {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.01, backgroundColor: "rgba(228, 236, 233, 0.5)" }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center justify-between px-2 sm:px-3 py-2 sm:py-3 w-full cursor-pointer rounded-lg transition-colors border border-transparent hover:border-gray-300/50"
    >
      {/* Informações do reembolso */}
      <div className="inline-flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
        {/* Avatar com ícone da categoria */}
        <Avatar className="w-[30px] h-[30px] sm:w-[34px] sm:h-[34px] bg-gray-400 flex-shrink-0 items-center justify-center">
          <AvatarImage
            src={icon}
            alt={reimbursement.name}
            className="w-[18px] h-[18px] sm:w-[20px] sm:h-[20px]"
          />
          <AvatarFallback className="bg-gray-400">
            <img className="w-[18px] h-[18px]" alt="Icon" src={icon} />
          </AvatarFallback>
        </Avatar>

        {/* Nome e categoria */}
        <div className="inline-flex flex-col items-start justify-center min-w-0 flex-1">
          <div className="font-heading-sm font-[number:var(--heading-sm-font-weight)] text-gray-100 text-xs sm:text-[length:var(--heading-sm-font-size)] tracking-[var(--heading-sm-letter-spacing)] leading-[var(--heading-sm-line-height)] [font-style:var(--heading-sm-font-style)] truncate w-full">
            {reimbursement.name}
          </div>
          <div className="font-body-sm font-[number:var(--body-sm-font-weight)] text-gray-200 text-[10px] sm:text-[length:var(--body-sm-font-size)] tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
            {reimbursement.category}
          </div>
        </div>
      </div>

      {/* Valor */}
      <div className="inline-flex items-baseline gap-0.5 sm:gap-1 flex-shrink-0 ml-2">
        <div className="font-body-sm font-[number:var(--body-sm-font-weight)] text-gray-200 text-[10px] sm:text-[length:var(--body-sm-font-size)] text-right tracking-[var(--body-sm-letter-spacing)] leading-[var(--body-sm-line-height)] [font-style:var(--body-sm-font-style)]">
          R$
        </div>
        <div className="font-subheading font-[number:var(--subheading-font-weight)] text-gray-100 text-xs sm:text-[length:var(--subheading-font-size)] text-right tracking-[var(--subheading-letter-spacing)] leading-[var(--subheading-line-height)] [font-style:var(--subheading-font-style)] whitespace-nowrap">
          {formatCurrency(reimbursement.amount)}
        </div>
      </div>
    </motion.div>
  );
};
