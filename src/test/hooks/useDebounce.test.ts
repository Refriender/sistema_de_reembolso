/**
 * Testes do Hook useDebounce
 *
 * Testa a funcionalidade de debounce para otimização de busca
 */

import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useDebounce } from "../../shared/hooks/useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("deve retornar o valor inicial imediatamente", () => {
    const { result } = renderHook(() => useDebounce("initial", 500));
    expect(result.current).toBe("initial");
  });

  it("deve atualizar o valor após o delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "initial", delay: 500 } }
    );

    // Valor inicial
    expect(result.current).toBe("initial");

    // Atualiza o valor
    rerender({ value: "updated", delay: 500 });

    // Ainda não deve ter atualizado
    expect(result.current).toBe("initial");

    // Avança o tempo
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Agora deve ter atualizado
    expect(result.current).toBe("updated");
  });

  it("deve cancelar atualizações anteriores se o valor mudar antes do delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      { initialProps: { value: "first", delay: 500 } }
    );

    // Atualiza rapidamente várias vezes
    rerender({ value: "second", delay: 500 });
    act(() => {
      vi.advanceTimersByTime(200);
    });

    rerender({ value: "third", delay: 500 });
    act(() => {
      vi.advanceTimersByTime(200);
    });

    rerender({ value: "fourth", delay: 500 });

    // Ainda deve ter o valor inicial
    expect(result.current).toBe("first");

    // Avança o tempo total
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Deve ter apenas o último valor
    expect(result.current).toBe("fourth");
  });

  it("deve usar o delay padrão de 500ms", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value), {
      initialProps: { value: "initial" },
    });

    rerender({ value: "updated" });

    // Avança 499ms - não deve atualizar
    act(() => {
      vi.advanceTimersByTime(499);
    });
    expect(result.current).toBe("initial");

    // Avança mais 1ms - deve atualizar
    act(() => {
      vi.advanceTimersByTime(1);
    });
    expect(result.current).toBe("updated");
  });
});
