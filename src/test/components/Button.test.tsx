/**
 * Testes do Componente Button
 *
 * Testa renderização e variantes do botão
 */

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "../test-utils";
import { Button } from "../../components/ui/button";

describe("Button", () => {
  it("deve renderizar o texto do botão", () => {
    render(<Button>Click me</Button>);
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  it("deve chamar onClick quando clicado", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("não deve chamar onClick quando desabilitado", () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>
    );

    fireEvent.click(screen.getByRole("button"));

    expect(handleClick).not.toHaveBeenCalled();
  });

  it("deve aplicar classe disabled quando desabilitado", () => {
    render(<Button disabled>Click me</Button>);

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("deve renderizar como link variant", () => {
    render(<Button variant="link">Link Button</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("text-green-100");
  });

  it("deve renderizar com tamanho icon", () => {
    render(<Button size="icon">🔍</Button>);

    const button = screen.getByRole("button");
    expect(button).toHaveClass("h-9");
    expect(button).toHaveClass("w-9");
  });

  it("deve aceitar className customizado", () => {
    render(<Button className="custom-class">Custom</Button>);

    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("deve renderizar children corretamente", () => {
    render(
      <Button>
        <span data-testid="icon">🎉</span>
        <span>With Icon</span>
      </Button>
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("With Icon")).toBeInTheDocument();
  });
});
