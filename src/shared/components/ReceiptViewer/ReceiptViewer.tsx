/**
 * Componente de Visualização de Comprovante
 *
 * Modal para visualizar e fazer download de comprovantes
 * Suporta imagens (JPG, PNG) e PDFs
 */

import { FileTextIcon } from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { dataUrlToBlob, downloadFile } from "../../utils/file";

interface ReceiptViewerProps {
  /** Data URL do comprovante */
  receipt?: string;
  /** Nome do arquivo do comprovante */
  receiptName?: string;
  /** Estado de abertura do modal */
  open: boolean;
  /** Callback para mudança de estado */
  onOpenChange: (open: boolean) => void;
}

/**
 * Componente que renderiza o visualizador de comprovantes
 */
export const ReceiptViewer: React.FC<ReceiptViewerProps> = ({
  receipt,
  receiptName,
  open,
  onOpenChange,
}) => {
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<"pdf" | "image" | null>(null);
  // Ref para armazenar a URL atual e evitar problemas de closure
  const objectUrlRef = useRef<string | null>(null);

  /**
   * Função para revogar URL anterior
   */
  const revokeUrl = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
  }, []);

  /**
   * Efeito para processar o comprovante quando o modal abre
   */
  useEffect(() => {
    // Limpa URL anterior se existir
    if (!receipt || !open) {
      revokeUrl();
      setObjectUrl(null);
      return;
    }

    /**
     * Processa o comprovante convertendo data URL para Blob URL
     */
    const processReceipt = async () => {
      const blob = await dataUrlToBlob(receipt);
      if (blob) {
        // Revoga URL anterior antes de criar nova
        revokeUrl();

        const url = URL.createObjectURL(blob);
        objectUrlRef.current = url;
        setObjectUrl(url);

        // Determina o tipo de arquivo
        if (blob.type.includes("pdf")) {
          setFileType("pdf");
        } else if (blob.type.includes("image")) {
          setFileType("image");
        }
      }
    };

    processReceipt();

    // Cleanup: revoga URL ao desmontar
    return () => {
      revokeUrl();
    };
  }, [receipt, open, revokeUrl]);

  /**
   * Handler para fazer download do comprovante
   */
  const handleDownload = async () => {
    if (!receipt || !receiptName) {
      return;
    }

    try {
      await downloadFile(receipt, receiptName);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Erro ao baixar o arquivo. Por favor, tente novamente.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] sm:w-[90vw] md:w-[95vw] max-w-[900px] h-[95vh] sm:max-h-[90vh] bg-gray-500 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6 flex flex-col">
        {/* Header com título */}
        <DialogHeader className="gap-1.5 sm:gap-2 md:gap-3 flex-shrink-0">
          <DialogTitle className="font-heading-lg font-[number:var(--heading-lg-font-weight)] text-gray-100 text-xs sm:text-sm md:text-base lg:text-[length:var(--heading-lg-font-size)] tracking-[var(--heading-lg-letter-spacing)] leading-[var(--heading-lg-line-height)] [font-style:var(--heading-lg-font-style)] text-left flex items-center gap-1.5 sm:gap-2">
            <FileTextIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-100 flex-shrink-0" />
            <span className="truncate text-[11px] sm:text-xs md:text-sm lg:text-base">
              {receiptName || "Comprovante"}
            </span>
          </DialogTitle>
          <DialogDescription className="sr-only">
            Visualização do comprovante de reembolso
          </DialogDescription>
        </DialogHeader>

        {/* Área de visualização */}
        <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 flex-1 min-h-0">
          {/* Visualizador de imagem */}
          {objectUrl && fileType === "image" && (
            <div className="w-full flex-1 overflow-auto bg-gray-400 rounded-lg p-2 sm:p-3 md:p-4 flex items-center justify-center">
              <img
                src={objectUrl}
                alt="Comprovante"
                className="max-w-full h-auto rounded"
              />
            </div>
          )}

          {/* Visualizador de PDF */}
          {objectUrl && fileType === "pdf" && (
            <div className="w-full flex-1 bg-gray-400 rounded-lg overflow-hidden min-h-0">
              <iframe
                src={`${objectUrl}#view=FitH`}
                className="w-full h-full border-0"
                title="Comprovante PDF"
              />
            </div>
          )}

          {/* Estado de carregamento */}
          {!objectUrl && (
            <div className="w-full flex-1 bg-gray-400 rounded-lg flex items-center justify-center min-h-0">
              <p className="text-gray-200 text-[10px] sm:text-xs md:text-sm">
                Carregando comprovante...
              </p>
            </div>
          )}

          {/* Botões de ação */}
          <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 justify-end flex-shrink-0 pt-2 sm:pt-0">
            <Button
              variant="link"
              onClick={() => onOpenChange(false)}
              className="h-9 sm:h-10 md:h-auto px-0 py-1.5 sm:py-2 no-underline"
            >
              <span className="[font-family:'Open_Sans',Helvetica] font-semibold text-[11px] sm:text-xs md:text-sm tracking-[0] leading-6">
                Fechar
              </span>
            </Button>

            <Button
              onClick={handleDownload}
              className="h-9 sm:h-10 md:h-12 bg-green-100 hover:bg-green-200 disabled:bg-green-300 disabled:cursor-not-allowed rounded-lg px-3 sm:px-4 md:px-5 transition-colors"
            >
              <span className="[font-family:'Open_Sans',Helvetica] font-bold text-white text-[11px] sm:text-xs md:text-sm text-center tracking-[0] leading-[18px]">
                Baixar comprovante
              </span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
