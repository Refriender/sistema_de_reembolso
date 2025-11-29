/**
 * Testes do Componente Input
 *
 * Testa renderização e interação do input
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "../test-utils";
import { Input } from "../../components/ui/input";

describe("Input", () => {
  it("deve renderizar input corretamente", () => {
    render(<Input placeholder="Digite aqui" />);
    expect(screen.getByPlaceholderText("Digite aqui")).toBeInTheDocument();
  });

  it("deve atualizar valor ao digitar", () => {
    render(<Input placeholder="Digite aqui" />);
    const input = screen.getByPlaceholderText("Digite aqui");

    fireEvent.change(input, { target: { value: "novo valor" } });

    expect(input).toHaveValue("novo valor");
  });

  it("deve chamar onChange quando valor muda", () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} placeholder="Digite aqui" />);

    fireEvent.change(screen.getByPlaceholderText("Digite aqui"), {
      target: { value: "teste" },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("deve estar desabilitado quando disabled é true", () => {
    render(<Input disabled placeholder="Desabilitado" />);

    expect(screen.getByPlaceholderText("Desabilitado")).toBeDisabled();
  });

  it("deve ser somente leitura quando readOnly é true", () => {
    render(<Input readOnly value="Somente leitura" />);

    expect(screen.getByDisplayValue("Somente leitura")).toHaveAttribute(
      "readonly"
    );
  });

  it("deve aceitar tipo password", () => {
    render(<Input type="password" placeholder="Senha" />);

    expect(screen.getByPlaceholderText("Senha")).toHaveAttribute(
      "type",
      "password"
    );
  });

  it("deve aceitar className customizado", () => {
    render(<Input className="custom-input" placeholder="Custom" />);

    expect(screen.getByPlaceholderText("Custom")).toHaveClass("custom-input");
  });

  it("deve ter foco quando focado", () => {
    render(<Input placeholder="Focável" />);
    const input = screen.getByPlaceholderText("Focável");

    input.focus();

    expect(input).toHaveFocus();
  });
});
