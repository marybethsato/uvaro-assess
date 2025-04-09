// src/components/__tests__/BaseButton.test.tsx
import { fireEvent, render, screen } from "@testing-library/react";
import BaseButton from "../buttons/BaseButton";

describe("BaseButton component", () => {
  test("renders children text", () => {
    render(<BaseButton>Click me</BaseButton>);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  test("applies className prop", () => {
    render(<BaseButton className="bg-red-500">Red</BaseButton>);
    expect(screen.getByRole("button")).toHaveClass("bg-red-500");
  });

  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn<void, []>();
    render(<BaseButton onClick={handleClick}>Click</BaseButton>);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("does not call onClick when disabled", () => {
    const handleClick = jest.fn<void, []>();
    render(
      <BaseButton onClick={handleClick} disabled>
        Disabled
      </BaseButton>
    );
    const btn = screen.getByRole("button");
    expect(btn).toBeDisabled();
    fireEvent.click(btn);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<BaseButton>Snapshot</BaseButton>);
    expect(asFragment()).toMatchSnapshot();
  });
});
