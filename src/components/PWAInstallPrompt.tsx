/**
 * PWA Install Prompt Component
 *
 * Componente flutuante que aparece quando o aplicativo está pronto para ser instalado.
 * Utiliza o evento 'beforeinstallprompt' do navegador.
 */

import { DownloadIcon, XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

/**
 * Interface para o evento beforeinstallprompt
 * Este evento não é padronizado no TypeScript, então definimos manualmente
 */
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
  prompt(): Promise<void>;
}

export const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      // Previne o mini-infobar padrão do Chrome
      e.preventDefault();
      // Guarda o evento para disparar depois
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Mostra o botão customizado
      setIsVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      return;
    }

    // Mostra o prompt nativo
    deferredPrompt.prompt();

    // Espera a escolha do usuário
    const { outcome } = await deferredPrompt.userChoice;

    // Log do resultado (warn é permitido pelo ESLint)
    if (outcome === "accepted") {
      console.warn("PWA: Usuário aceitou a instalação");
    } else {
      console.warn("PWA: Usuário recusou a instalação");
    }

    // Limpa o prompt
    setDeferredPrompt(null);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-4 md:w-auto"
        >
          <div className="flex items-center gap-4 p-4 bg-gray-100 border border-gray-300 rounded-xl shadow-lg backdrop-blur-sm bg-opacity-95">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DownloadIcon className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-gray-100">
                  Instalar App
                </span>
                <span className="text-xs text-gray-200">
                  Adicione à tela inicial
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                onClick={handleInstallClick}
                className="h-9 bg-green-100 hover:bg-green-200 text-white text-xs font-bold px-4 rounded-lg"
              >
                Instalar
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsVisible(false)}
                className="h-9 w-9 text-gray-200 hover:bg-gray-300 rounded-lg"
              >
                <XIcon className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
