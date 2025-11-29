/**
 * Hook de Reembolsos
 *
 * Hook customizado para gerenciar operações de reembolsos
 * usando React Query
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Reimbursement } from "../../../shared/types";
import { reimbursementService } from "../services/reimbursement.service";

/**
 * Chaves de query para cache do React Query
 */
export const QUERY_KEYS = {
  REIMBURSEMENTS: "reimbursements",
  REIMBURSEMENT: "reimbursement",
} as const;

/**
 * Hook para buscar lista de reembolsos com paginação
 */
export const useReimbursements = (
  page: number,
  limit: number = 6,
  search?: string
) => {
  return useQuery({
    queryKey: [QUERY_KEYS.REIMBURSEMENTS, page, search],
    queryFn: () => reimbursementService.getAll(page, limit, search),
  });
};

/**
 * Hook para buscar um reembolso específico
 */
export const useReimbursement = (id: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.REIMBURSEMENT, id],
    queryFn: () => reimbursementService.getById(id),
    enabled: !!id,
  });
};

/**
 * Hook para criar um novo reembolso
 */
export const useCreateReimbursement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Reimbursement, "id" | "createdAt">) =>
      reimbursementService.create(data),
    onSuccess: () => {
      // Invalida cache para forçar refetch
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REIMBURSEMENTS] });
    },
  });
};

/**
 * Hook para excluir um reembolso
 */
export const useDeleteReimbursement = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => reimbursementService.delete(id),
    onSuccess: () => {
      // Invalida cache para forçar refetch
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.REIMBURSEMENTS] });
    },
  });
};
