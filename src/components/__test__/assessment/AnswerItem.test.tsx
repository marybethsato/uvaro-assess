import { render, screen, fireEvent } from "@testing-library/react";
import AnswerItem from "../../assessment/AnswerItem";

describe("AnswerItem component", () => {
  const text = "Sample Answer";

  test("renders the provided text and an unchecked radio button by default", () => {
    render(<AnswerItem text={text} isSelected={false} onSelect={() => {}} />);

    // Verify that the text is displayed
    expect(screen.getByText(text)).toBeInTheDocument();

    // Verify that the radio input is unchecked
    const radio = screen.getByRole("radio") as HTMLInputElement;
    expect(radio.checked).toBe(false);

    // Verify that the container has the unselected styles
    const container = screen.getByTestId("answer-item");
    expect(container).toHaveClass("border-gray-300");
    expect(container).toHaveClass("hover:bg-gray-100");
  });

  test("applies selected styles and checks the radio button when isSelected=true", () => {
    render(<AnswerItem text={text} isSelected={true} onSelect={() => {}} />);

    // Verify that the radio input is checked
    const radio = screen.getByRole("radio") as HTMLInputElement;
    expect(radio.checked).toBe(true);

    // Verify that the container has the selected styles
    const container = screen.getByTestId("answer-item");
    expect(container).toHaveClass("border-green-500");
    expect(container).toHaveClass("bg-green-50");
  });

  test("calls the onSelect handler when the container is clicked", () => {
    const handleSelect = jest.fn<void, []>();
    render(
      <AnswerItem text={text} isSelected={false} onSelect={handleSelect} />
    );

    // Click the container div
    const container = screen.getByTestId("answer-item");
    fireEvent.click(container);

    // Verify that the onSelect callback was called once
    expect(handleSelect).toHaveBeenCalledTimes(1);
  });
});
