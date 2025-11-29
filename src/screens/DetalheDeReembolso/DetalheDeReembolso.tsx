/**
 * Detalhe de Reembolso Screen
 *
 * Tela que exibe os detalhes completos de um reembolso específico.
 * Permite visualizar informações, abrir comprovante e excluir o reembolso.
 *
 * Features:
 * - Carregamento assíncrono dos dados via React Query
 * - Visualização de comprovante em modal
 * - Exclusão com confirmação
 * - Estados de loading e erro
 * - Navegação de volta para lista
 * - Totalmente responsivo
 *
 * Fluxo de navegação:
 * - Usuário vem da lista de reembolsos
 * - Pode voltar para lista clicando em "Voltar" ou no logo
 * - Após excluir, é redirecionado para lista
 *
 * @example
 * ```tsx
 * // Rota no App.tsx
 * <Route path="/detalhe-de-reembolso/:id" element={<DetalheDeReembolso />} />
 * ```
 */

import { FileTextIcon, Loader2Icon } from "lucide-react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteReimbursement,
  useReimbursement,
} from "../../features/reimbursements/hooks";
import { Footer } from "../../components/Footer";
import { SEO } from "../../components/SEO";
import { ReceiptViewer } from "../../shared/components/ReceiptViewer";
import { Button } from "../../components/ui/button";
import { formatCurrency } from "../../shared/utils/format";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { toast } from "../../hooks/use-toast";

/**
 * Detalhe de Reembolso Screen Component
 *
 * Gerencia a visualização e ações de um reembolso específico
 */
export const DetalheDeReembolso = (): JSX.Element => {
  // Extrai ID do reembolso da URL (parâmetro dinâmico)
  const { id } = useParams<{ id: string }>();

  // Hook de navegação para redirecionamentos
  const navigate = useNavigate();

  // Estado para controlar modal de confirmação de exclusão
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Estado para controlar modal de visualização de comprovante
  const [isReceiptViewerOpen, setIsReceiptViewerOpen] = useState(false);

  /**
   * Hook para buscar dados do reembolso
   */
  const { data: reimbursement, isLoading } = useReimbursement(id ?? "");

  /**
   * Hook para excluir reembolso
   */
  const deleteMutation = useDeleteReimbursement();

  /**
   * Handler para confirmar exclusão
   * Executa a mutation de delete
   */
  const handleDelete = () => {
    if (!id) {
      return;
    }
    deleteMutation.mutate(id, {
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Sucesso",
          description: "Reembolso excluído com sucesso.",
        });
        navigate("/lista-de-reembolsos");
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Erro",
          description: "Não foi possível excluir o reembolso.",
        });
      },
    });
  };

  /**
   * Handler para abrir visualizador de comprovante
   */
  const handleOpenReceipt = () => {
    setIsReceiptViewerOpen(true);
  };

  // Estado de carregamento: mostra spinner centralizado
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-400">
        <Loader2Icon className="w-8 h-8 text-green-100 animate-spin" />
      </div>
    );
  }

  // Estado de erro: reembolso não encontrado
  if (!reimbursement) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-400">
        <p className="text-gray-200">Reembolso não encontrado</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col bg-gray-400"
      data-model-id="2301:764"
    >
      <SEO
        title={
          reimbursement
            ? `Detalhes - ${reimbursement.name}`
            : "Detalhes do Reembolso"
        }
        description="Visualize os detalhes completos da solicitação de reembolso, incluindo valores e comprovantes."
      />

      {/* Header com logo e navegação */}
      <header className="w-full px-4 sm:px-6 lg:px-10 py-4 sm:py-6 md:py-10">
        <div className="max-w-[1185px] mx-auto flex justify-between items-center">
          {/* Logo clicável - volta para lista ao clicar */}
          <div
            className="relative w-[70px] sm:w-[101.05px] h-5 sm:h-8 opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:0ms] cursor-pointer flex-shrink-0"
            onClick={() => navigate("/lista-de-reembolsos")}
          >
            {/* Ícone verde do logo */}
            <img
              className="absolute w-[18.94%] h-[70.37%] top-[13.16%] left-[5.83%]"
              alt="Logo"
              src="/assets/logo.svg"
            />
            {/* Texto "refund" do logo */}
            <img
              className="absolute top-[9px] left-[35px] w-[60px] h-3.5"
              alt="Refund"
              src="/assets/icons/refund.svg"
            />
          </div>

          {/* Navegação com botão Voltar */}
          <nav className="flex items-center gap-2 sm:gap-4 opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:200ms]">
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

      {/* Conteúdo principal com card de detalhes */}
      <main className="flex justify-center items-start px-4 sm:px-6 lg:px-10 pb-6 sm:pb-10 flex-1 opacity-0 translate-y-[-1rem] animate-fade-in [--animation-delay:400ms]">
        <Card className="w-full max-w-[512px] bg-gray-500 rounded-2xl border-0 shadow-none">
          {/* Header do card com título e descrição */}
          <CardHeader className="space-y-2 sm:space-y-3 p-4 sm:p-6">
            <CardTitle className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-gray-100 text-base sm:text-[length:var(--heading-lg-font-size)] tracking-[var(--heading-lg-letter-spacing)] leading-[var(--heading-lg-line-height)] [font-style:var(--heading-lg-font-style)]">
              Solicitação de reembolso
            </CardTitle>
            <CardDescription className="font-body-md-regular font-[number:var(--body-md-regular-font-weight)] text-gray-200 text-xs sm:text-[length:var(--body-md-regular-font-size)] tracking-[var(--body-md-regular-letter-spacing)] leading-[var(--body-md-regular-line-height)] [font-style:var(--body-md-regular-font-style)]">
              Dados da despesa para solicitar reembolso.
            </CardDescription>
          </CardHeader>

          {/* Conteúdo do card com campos do formulário */}
          <CardContent className="space-y-4 sm:space-y-6 md:space-y-8 p-4 sm:p-6 pt-0">
            {/* Campo Nome da Solicitação (somente leitura) */}
            <div className="flex flex-col gap-1.5 sm:gap-2 group">
              <Label className="[font-family:'Open_Sans',Helvetica] font-normal text-gray-200 text-[9px] sm:text-[10px] tracking-[0] leading-[14px] transition-colors group-focus-within:text-green-100">
                NOME DA SOLICITAÇÃO
              </Label>
              <Input
                value={reimbursement.name}
                readOnly
                className="h-10 sm:h-12 px-3 sm:px-4 rounded-lg border-[#cdd4d1] [font-family:'Open_Sans',Helvetica] font-normal text-gray-100 text-xs sm:text-sm tracking-[0] leading-[18px] bg-gray-400/30"
              />
            </div>

            {/* Campos Categoria e Valor (lado a lado em desktop) */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              {/* Campo Categoria (somente leitura, disabled) */}
              <div className="flex flex-col gap-1.5 sm:gap-2 flex-1 min-w-0 sm:min-w-[200px] group">
                <Label className="[font-family:'Open_Sans',Helvetica] font-normal text-gray-200 text-[9px] sm:text-[10px] tracking-[0] leading-[14px] transition-colors group-focus-within:text-green-100">
                  CATEGORIA
                </Label>
                <Select value={reimbursement.category} disabled>
                  <SelectTrigger className="h-10 sm:h-12 rounded-lg border-[#cdd4d1] [font-family:'Open_Sans',Helvetica] font-normal text-gray-100 text-xs sm:text-sm tracking-[0] leading-[18px] bg-gray-400/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={reimbursement.category}>
                      {reimbursement.category}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Campo Valor (somente leitura, formatado) */}
              <div className="flex flex-col gap-1.5 sm:gap-2 w-full sm:w-[154px] group">
                <Label className="[font-family:'Open_Sans',Helvetica] font-normal text-gray-200 text-[9px] sm:text-[10px] tracking-[0] leading-[14px] transition-colors group-focus-within:text-green-100">
                  VALOR
                </Label>
                <Input
                  value={formatCurrency(reimbursement.amount)}
                  readOnly
                  className="h-10 sm:h-12 px-3 sm:px-4 rounded-lg border-[#cdd4d1] [font-family:'Open_Sans',Helvetica] font-normal text-gray-100 text-xs sm:text-sm tracking-[0] leading-[18px] bg-gray-400/30"
                />
              </div>
            </div>

            {/* Ações: Abrir comprovante e Excluir */}
            <div className="flex flex-col gap-3 sm:gap-4">
              {/* Link para abrir visualizador de comprovante */}
              <Button
                variant="link"
                onClick={handleOpenReceipt}
                className="h-10 sm:h-12 justify-center gap-2 no-underline"
              >
                <FileTextIcon className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
                <span className="[font-family:'Open_Sans',Helvetica] font-semibold text-xs sm:text-sm tracking-[0] leading-6">
                  Abrir comprovante
                </span>
              </Button>

              {/* Botão para abrir modal de confirmação de exclusão */}
              <Button
                onClick={() => setIsDeleteModalOpen(true)}
                className="h-10 sm:h-12 bg-green-100 hover:bg-green-200 disabled:bg-green-300 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                <span className="[font-family:'Open_Sans',Helvetica] font-bold text-white text-xs sm:text-sm text-center tracking-[0] leading-[18px]">
                  Excluir
                </span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Modal de visualização de comprovante */}
      <ReceiptViewer
        receipt={reimbursement.receipt}
        receiptName={reimbursement.receiptName}
        open={isReceiptViewerOpen}
        onOpenChange={setIsReceiptViewerOpen}
      />

      {/* Modal de confirmação de exclusão */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="w-[90vw] sm:w-[95vw] max-w-[512px] bg-gray-500 rounded-2xl p-5 sm:p-6 md:p-10 gap-4 sm:gap-6">
          {/* Header do modal com título e descrição */}
          <DialogHeader className="gap-2 sm:gap-3">
            <DialogTitle className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-gray-100 text-base sm:text-[length:var(--heading-lg-font-size)] tracking-[var(--heading-lg-letter-spacing)] leading-[var(--heading-lg-line-height)] [font-style:var(--heading-lg-font-style)] text-left">
              Excluir solicitação
            </DialogTitle>
            <DialogDescription className="font-body-md-regular font-[number:var(--body-md-regular-font-weight)] text-gray-200 text-xs sm:text-[length:var(--body-md-regular-font-size)] tracking-[var(--body-md-regular-letter-spacing)] leading-[var(--body-md-regular-line-height)] [font-style:var(--body-md-regular-font-style)] text-left">
              Tem certeza que deseja excluir essa solicitação? Essa ação é
              irreversível.
            </DialogDescription>
          </DialogHeader>

          {/* Footer com botões de ação */}
          <DialogFooter className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 md:gap-4">
            {/* Botão Cancelar - fecha modal sem excluir */}
            <Button
              variant="link"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={deleteMutation.isPending}
              className="h-10 sm:h-auto px-0 py-2 no-underline"
            >
              <span className="[font-family:'Open_Sans',Helvetica] font-semibold text-xs sm:text-sm tracking-[0] leading-6">
                Cancelar
              </span>
            </Button>

            {/* Botão Confirmar - executa exclusão */}
            <Button
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="h-10 sm:h-12 bg-green-100 hover:bg-green-200 disabled:bg-green-300 disabled:cursor-not-allowed rounded-lg px-4 sm:px-5 transition-colors"
            >
              <span className="[font-family:'Open_Sans',Helvetica] font-bold text-white text-xs sm:text-sm text-center tracking-[0] leading-[18px]">
                {/* Mostra "Excluindo..." durante a operação */}
                {deleteMutation.isPending ? "Excluindo..." : "Confirmar"}
              </span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rodapé */}
      <Footer />
    </div>
  );
};
