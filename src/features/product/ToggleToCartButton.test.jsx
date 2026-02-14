import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect } from "vitest";

import { CartProvider } from "../cart/CartProvider";
import { ToggleToCartButton } from "./ToggleToCartButton";

describe("ToggleToCartButton", () => {
  it("초기에는 '담기' 버튼이 보인다", () => {
    render(
      <CartProvider>
        <ToggleToCartButton id={1} />
      </CartProvider>
    );

    expect(
      screen.getByRole("button", { name: "담기" })
    ).toBeInTheDocument();
  });

  it("클릭하면 '담김!'으로 바뀐다", async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <ToggleToCartButton id={1} />
      </CartProvider>
    );

    await user.click(screen.getByRole("button", { name: "담기" }));

    expect(
      screen.getByRole("button", { name: "담김!" })
    ).toBeInTheDocument();
  });

  it("다시 클릭하면 '담기'로 돌아온다", async () => {
    const user = userEvent.setup();

    render(
      <CartProvider>
        <ToggleToCartButton id={1} />
      </CartProvider>
    );

    const button = screen.getByRole("button", { name: "담기" });

    await user.click(button); // 담김!
    await user.click(screen.getByRole("button", { name: "담김!" })); // 다시 담기

    expect(
      screen.getByRole("button", { name: "담기" })
    ).toBeInTheDocument();
  });
});