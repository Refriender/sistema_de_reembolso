/**
 * Footer Component
 *
 * Rodapé da aplicação com informações de copyright e links sociais.
 * Exibido em todas as páginas da aplicação.
 *
 * Features:
 * - Copyright com nome do desenvolvedor
 * - Links para LinkedIn e GitHub
 * - Ícones sociais com hover states
 * - Totalmente responsivo
 * - Combina com o design system do projeto
 *
 * @example
 * ```tsx
 * <Footer />
 * ```
 */

import { GithubIcon, LinkedinIcon } from "lucide-react";
import React from "react";
import { FadeIn, ScaleOnTap } from "../../shared/components/Motion";

/**
 * Footer Component
 *
 * Renderiza o rodapé com copyright e links sociais
 */
export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-gray-500 border-t border-gray-300 mt-auto">
      <FadeIn
        delay={0.2}
        className="max-w-[1185px] mx-auto px-4 sm:px-6 lg:px-10 py-4 sm:py-6"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          {/* Copyright */}
          <div className="flex items-center gap-2">
            <p className="[font-family:'Open_Sans',Helvetica] font-normal text-gray-200 text-xs sm:text-sm tracking-[0] leading-5 text-center sm:text-left">
              © {currentYear} Todos os direitos reservados{" "}
              <span className="font-semibold text-gray-100">
                Glaucco Siqueira
              </span>
            </p>
          </div>

          {/* Links sociais */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* LinkedIn */}
            <ScaleOnTap>
              <a
                href="https://www.linkedin.com/in/glaucco-siqueira/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gray-400 hover:bg-green-100 transition-colors group"
                aria-label="LinkedIn de Glaucco Siqueira"
              >
                <LinkedinIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-200 group-hover:text-white transition-colors" />
              </a>
            </ScaleOnTap>

            {/* GitHub */}
            <ScaleOnTap>
              <a
                href="https://github.com/glauccoeng-prog/sistema_de_reembolso"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gray-400 hover:bg-green-100 transition-colors group"
                aria-label="GitHub de Glaucco Siqueira"
              >
                <GithubIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-200 group-hover:text-white transition-colors" />
              </a>
            </ScaleOnTap>
          </div>
        </div>
      </FadeIn>
    </footer>
  );
};
