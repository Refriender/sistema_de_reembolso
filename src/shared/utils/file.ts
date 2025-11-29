/**
 * Utilitários de Arquivo
 *
 * Funções auxiliares para manipulação de arquivos
 */

import { FILE_VALIDATION } from "../constants/storage";

/**
 * Valida se um arquivo é do tipo aceito
 * @param file - Arquivo a ser validado
 * @returns true se o arquivo é válido
 */
export const isValidFileType = (file: File): boolean => {
  return FILE_VALIDATION.ACCEPTED_TYPES.includes(file.type);
};

/**
 * Valida se o tamanho do arquivo está dentro do limite
 * @param file - Arquivo a ser validado
 * @returns true se o tamanho é válido
 */
export const isValidFileSize = (file: File): boolean => {
  return file.size <= FILE_VALIDATION.MAX_SIZE;
};

/**
 * Converte um arquivo para data URL
 * @param file - Arquivo a ser convertido
 * @returns Promise com a data URL
 */
export const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

/**
 * Converte data URL para Blob
 * @param dataUrl - Data URL a ser convertida
 * @returns Promise com o Blob
 */
export const dataUrlToBlob = async (dataUrl: string): Promise<Blob | null> => {
  try {
    const response = await fetch(dataUrl);
    return await response.blob();
  } catch (error) {
    console.error("Error converting data URL to Blob:", error);
    return null;
  }
};

/**
 * Faz download de um arquivo a partir de uma data URL
 * @param dataUrl - Data URL do arquivo
 * @param filename - Nome do arquivo para download
 */
export const downloadFile = async (
  dataUrl: string,
  filename: string
): Promise<void> => {
  const blob = await dataUrlToBlob(dataUrl);
  if (!blob) {
    throw new Error("Failed to convert data URL to blob");
  }

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();

  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
};
