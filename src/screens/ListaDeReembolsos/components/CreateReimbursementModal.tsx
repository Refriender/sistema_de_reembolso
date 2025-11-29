/**
 * Create Reimbursement Modal Component
 *
 * Modal para criação de novos reembolsos com formulário completo.
 * Inclui validação de campos, upload de arquivo e feedback ao usuário.
 *
 * Features:
 * - Formulário com React Hook Form
 * - Validação de campos (nome, categoria, valor, arquivo)
 * - Upload de comprovante (JPG, PNG, PDF até 5MB)
 * - Feedback visual com toasts
 * - Estados de loading durante envio
 * - Redirecionamento após sucesso
 * - Totalmente responsivo
 *
 * Validações implementadas:
 * - Nome: mínimo 3 caracteres, obrigatório
 * - Categoria: obrigatória
 * - Valor: formato monetário válido, maior que zero
 * - Arquivo: JPG/PNG/PDF, máximo 5MB
 *
 * Fluxo de uso:
 * 1. Usuário preenche formulário
 * 2. Seleciona arquivo de comprovante
 * 3. Clica em "Enviar"
 * 4. Sistema valida e cria reembolso
 * 5. Redireciona para página de sucesso
 *
 * @example
 * ```tsx
 * <CreateReimbursementModal
 *   open={isOpen}
 *   onOpenChange={setIsOpen}
 * />
 * ```
 */

import { UploadIcon, FileIcon, XIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useCreateReimbursement } from "../../../features/reimbursements/hooks";
import { CATEGORIES } from "../../../shared/constants/categories";
import { parseCurrency } from "../../../shared/utils/format";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { toast } from "../../../hooks/use-toast";

/**
 * Props do CreateReimbursementModal
 */
interface CreateReimbursementModalProps {
  /** Estado de abertura do modal */
  open: boolean;
  /** Callback para mudança de estado do modal */
  onOpenChange: (open: boolean) => void;
}

/**
 * Interface dos dados do formulário
 */
interface FormData {
  /** Nome do solicitante */
  name: string;
  /** Categoria da despesa */
  category: string;
  /** Valor da despesa (string para permitir vírgula) */
  amount: string;
}

/**
 * Create Reimbursement Modal Component
 *
 * Gerencia criação de reembolsos com validação completa
 */
export const CreateReimbursementModal: React.FC<
  CreateReimbursementModalProps
> = ({ open, onOpenChange }) => {
  // Hook de navegação para redirecionamento
  const navigate = useNavigate();

  // Ref para o input de arquivo (hidden)
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Estado para armazenar arquivo selecionado
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Estado para controle de Drag & Drop
  const [isDragging, setIsDragging] = useState(false);

  /**
   * Configuração do React Hook Form
   *
   * - register: Registra campos no formulário
   * - handleSubmit: Handler de submit com validação
   * - formState.errors: Erros de validação
   * - setValue: Define valor de campo programaticamente
   * - watch: Observa mudanças em campos
   * - reset: Reseta formulário para valores iniciais
   */
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      category: "",
      amount: "",
    },
  });

  // Observa mudanças no campo categoria (para Select controlado)
  const category = watch("category");

  /**
   * Registra campo categoria manualmente
   * Necessário porque Select não é um input nativo
   */
  React.useEffect(() => {
    register("category", { required: "Categoria é obrigatória" });
  }, [register]);

  /**
   * Hook para criar reembolso
   */
  const createMutation = useCreateReimbursement();

  /**
   * Valida e processa o arquivo selecionado
   */
  const validateAndSetFile = (file: File) => {
    const validTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSize = 5 * 1024 * 1024; // 5MB em bytes

    // Valida tipo de arquivo
    if (!validTypes.includes(file.type)) {
      toast({
        variant: "destructive",
        title: "Arquivo inválido",
        description: "Por favor, envie um arquivo JPG, PNG ou PDF.",
      });
      return;
    }

    // Valida tamanho do arquivo
    if (file.size > maxSize) {
      toast({
        variant: "destructive",
        title: "Arquivo muito grande",
        description: "O arquivo deve ter no máximo 5MB.",
      });
      return;
    }

    // Arquivo válido: armazena e confirma
    setSelectedFile(file);
    toast({
      title: "Arquivo selecionado",
      description: `${file.name} foi selecionado com sucesso.`,
    });
  };

  /**
   * Handler para abrir seletor de arquivo
   */
  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  /**
   * Handler para mudança de arquivo via input
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
    // Reseta o input para permitir selecionar o mesmo arquivo novamente se necessário
    e.target.value = "";
  };

  /**
   * Handlers para Drag & Drop
   */
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  /**
   * Handler de submit do formulário
   *
   * Validações adicionais:
   * 1. Categoria preenchida
   * 2. Arquivo selecionado
   * 3. Valor válido (número > 0)
   *
   * Se válido:
   * - Converte arquivo para data URL
   * - Envia para API
   *
   * Se inválido:
   * - Mostra toast de erro específico
   */
  const onSubmit = (data: FormData) => {
    // Valida categoria (campo Select)
    if (!data.category || data.category.trim() === "") {
      toast({
        variant: "destructive",
        title: "Categoria obrigatória",
        description: "Por favor, selecione uma categoria.",
      });
      return;
    }

    // Valida arquivo
    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "Comprovante obrigatório",
        description: "Por favor, envie o comprovante da despesa.",
      });
      return;
    }

    // Valida e converte valor monetário
    const amountValue = parseCurrency(data.amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      toast({
        variant: "destructive",
        title: "Valor inválido",
        description: "Por favor, insira um valor válido.",
      });
      return;
    }

    /**
     * Processa upload do arquivo
     */
    const reader = new FileReader();

    reader.onloadend = () => {
      createMutation.mutate(
        {
          name: data.name,
          category: data.category,
          amount: amountValue,
          receipt: reader.result as string,
          receiptName: selectedFile.name,
        },
        {
          onSuccess: () => {
            onOpenChange(false);
            reset();
            setSelectedFile(null);
            navigate("/solicitacao-enviada");
          },
          onError: () => {
            toast({
              variant: "destructive",
              title: "Erro",
              description:
                "Não foi possível criar o reembolso. Tente novamente.",
            });
          },
        }
      );
    };

    reader.onerror = () => {
      toast({
        variant: "destructive",
        title: "Erro ao processar arquivo",
        description: "Não foi possível processar o arquivo. Tente novamente.",
      });
    };

    reader.readAsDataURL(selectedFile);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Modal responsivo com scroll interno */}
      <DialogContent className="w-[92vw] sm:w-[95vw] max-w-[512px] bg-gray-500 rounded-2xl p-4 sm:p-6 md:p-10 gap-4 sm:gap-6 max-h-[90vh] overflow-y-auto">
        {/* Header do modal */}
        <DialogHeader className="gap-2 sm:gap-3">
          <DialogTitle className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-gray-100 text-base sm:text-lg md:text-[length:var(--heading-lg-font-size)] tracking-[var(--heading-lg-letter-spacing)] leading-[var(--heading-lg-line-height)] [font-style:var(--heading-lg-font-style)] text-left">
            Nova solicitação de reembolso
          </DialogTitle>
          <DialogDescription className="font-body-md-regular font-[number:var(--body-md-regular-font-weight)] text-gray-200 text-xs sm:text-sm md:text-[length:var(--body-md-regular-font-size)] tracking-[var(--body-md-regular-letter-spacing)] leading-[var(--body-md-regular-line-height)] [font-style:var(--body-md-regular-font-style)] text-left">
            Dados da despesa para solicitar reembolso.
          </DialogDescription>
        </DialogHeader>

        {/* Formulário de criação */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-6"
        >
          {/* Campo Nome da Solicitação */}
          <div className="flex flex-col gap-1.5 sm:gap-2 group">
            <Label
              htmlFor="name"
              className="[font-family:'Open_Sans',Helvetica] font-normal text-gray-200 text-[9px] sm:text-[10px] tracking-[0] leading-[14px] transition-colors group-focus-within:text-green-100"
            >
              NOME DA SOLICITAÇÃO
            </Label>
            <Input
              id="name"
              {...register("name", {
                required: "Nome é obrigatório",
                minLength: {
                  value: 3,
                  message: "Nome deve ter no mínimo 3 caracteres",
                },
              })}
              className="h-10 sm:h-12 rounded-lg border-[#cdd4d1] [font-family:'Open_Sans',Helvetica] font-normal text-gray-200 text-xs sm:text-sm"
            />
            {/* Mensagem de erro de validação */}
            {errors.name && (
              <span className="text-xs text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>

          {/* Campos Categoria e Valor (lado a lado em desktop) */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            {/* Campo Categoria (Select) */}
            <div className="flex flex-col gap-1.5 sm:gap-2 flex-1 min-w-0 sm:min-w-[200px] group">
              <Label
                htmlFor="category"
                className="[font-family:'Open_Sans',Helvetica] font-normal text-gray-200 text-[9px] sm:text-[10px] tracking-[0] leading-[14px] transition-colors group-focus-within:text-green-100"
              >
                CATEGORIA
              </Label>
              <Select
                value={category}
                onValueChange={(value) =>
                  setValue("category", value, { shouldValidate: true })
                }
              >
                <SelectTrigger
                  id="category"
                  className="h-10 sm:h-12 rounded-lg border-[#cdd4d1] [font-family:'Open_Sans',Helvetica] font-normal text-gray-200 text-xs sm:text-sm"
                >
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* Mensagem de erro de validação */}
              {errors.category && (
                <span className="text-xs text-red-500">
                  Categoria é obrigatória
                </span>
              )}
            </div>

            {/* Campo Valor */}
            <div className="flex flex-col gap-1.5 sm:gap-2 w-full sm:w-[154px] group">
              <Label
                htmlFor="amount"
                className="[font-family:'Open_Sans',Helvetica] font-normal text-gray-200 text-[9px] sm:text-[10px] tracking-[0] leading-[14px] transition-colors group-focus-within:text-green-100"
              >
                VALOR
              </Label>
              <Input
                id="amount"
                {...register("amount", {
                  required: "Valor é obrigatório",
                  pattern: {
                    value: /^\d+([,.]\d{1,2})?$/,
                    message: "Valor inválido",
                  },
                })}
                placeholder="0,00"
                className="h-10 sm:h-12 rounded-lg border-[#cdd4d1] [font-family:'Open_Sans',Helvetica] font-normal text-gray-200 text-xs sm:text-sm"
              />
              {/* Mensagem de erro de validação */}
              {errors.amount && (
                <span className="text-xs text-red-500">
                  {errors.amount.message}
                </span>
              )}
            </div>
          </div>

          {/* Campo Comprovante (Drag & Drop Inteligente) */}
          <div className="flex flex-col gap-1.5 sm:gap-2">
            <Label
              htmlFor="receipt"
              className="[font-family:'Open_Sans',Helvetica] font-normal text-gray-200 text-[9px] sm:text-[10px] tracking-[0] leading-[14px] transition-colors"
            >
              COMPROVANTE
            </Label>

            <AnimatePresence mode="wait">
              {!selectedFile ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  key="upload-zone"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={handleFileSelect}
                  className={`
                    relative flex flex-col items-center justify-center h-24 sm:h-28 rounded-lg border-2 border-dashed transition-all cursor-pointer
                    ${
                      isDragging
                        ? "border-green-100 bg-green-100/10 scale-[1.02]"
                        : "border-[#cdd4d1] hover:border-green-100 hover:bg-gray-50"
                    }
                  `}
                >
                  <div className="flex flex-col items-center gap-2 text-center p-2">
                    <div
                      className={`p-2 rounded-full ${isDragging ? "bg-green-100 text-white" : "bg-gray-100 text-gray-300"}`}
                    >
                      <UploadIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs sm:text-sm font-semibold text-gray-200">
                        {isDragging
                          ? "Solte o arquivo aqui"
                          : "Clique ou arraste o arquivo"}
                      </span>
                      <span className="text-[10px] text-gray-300">
                        JPG, PNG ou PDF (máx. 5MB)
                      </span>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  key="file-selected"
                  className="flex items-center justify-between p-3 rounded-lg border border-green-100 bg-green-100/5"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <FileIcon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-sm font-semibold text-gray-100 truncate">
                        {selectedFile.name}
                      </span>
                      <span className="text-xs text-gray-200">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </span>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={removeFile}
                    className="text-gray-300 hover:text-red-500 hover:bg-red-50"
                  >
                    <XIcon className="w-5 h-5" />
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Input de arquivo hidden */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Botão de submit */}
          <Button
            type="submit"
            disabled={createMutation.isPending}
            className="h-10 sm:h-12 w-full bg-green-100 hover:bg-green-200 disabled:bg-green-300 disabled:cursor-not-allowed rounded-lg font-bold text-white text-xs sm:text-sm transition-colors"
          >
            {/* Mostra "Enviando..." durante a operação */}
            {createMutation.isPending ? "Enviando..." : "Enviar"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
