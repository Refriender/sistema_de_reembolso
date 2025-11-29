/**
 * useDebounce Hook
 *
 * Hook para adiar a atualização de um valor até que um determinado tempo tenha passado
 * sem novas alterações. Muito útil para inputs de busca e validações em tempo real.
 *
 * @param value - O valor a ser monitorado
 * @param delay - O tempo de espera em milissegundos (padrão: 500ms)
 * @returns O valor com debounce aplicado
 *
 * @example
 * const debouncedSearch = useDebounce(searchTerm, 500);
 */

import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Configura um timer para atualizar o valor após o delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpa o timer se o valor mudar antes do delay terminar (cancelando a atualização anterior)
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
