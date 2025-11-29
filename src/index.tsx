/**
 * Entry Point da Aplicação
 *
 * Arquivo principal que inicializa a aplicação React.
 * Responsável por:
 * - Renderizar o componente App no DOM
 * - Ativar o StrictMode para detecção de problemas
 * - Conectar a aplicação ao elemento HTML root
 *
 * StrictMode:
 * - Ativa verificações e avisos adicionais em desenvolvimento
 * - Detecta problemas potenciais no código
 * - Não afeta o build de produção
 * - Ajuda a identificar componentes com side-effects inseguros
 *
 * @see https://react.dev/reference/react/StrictMode
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

/**
 * Inicialização da aplicação React
 *
 * 1. Busca o elemento HTML com id "app"
 * 2. Cria uma root do React 18
 * 3. Renderiza o App dentro do StrictMode
 */
createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
