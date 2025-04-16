import { fireEvent, render, screen } from "@testing-library/react";
import Answer from "../../../interfaces/answer";
import AnswerList from "../../assessment/AnswerList";

describe("AnswerList component", () => {
  const options: Answer[] = [
    { answerId: 1, answerText: "Option A" },
    { answerId: 2, answerText: "Option B" },
    { answerId: 3, answerText: "Option C" },
  ];

  test("renders correct number of AnswerItem components", () => {
    render(
      <AnswerList options={options} selected={null} onSelect={() => {}} />
    );
    const items = screen.getAllByTestId("answer-item");
    expect(items).toHaveLength(options.length);
  });

  test("marks the selected answer correctly", () => {
    // Selected answer is the second option
    const selected = options[1];
    render(
      <AnswerList options={options} selected={selected} onSelect={() => {}} />
    );

    const items = screen.getAllByTestId("answer-item");
    // First and third items should not have selected styles
    expect(items[0]).toHaveClass("border-gray-300");
    expect(items[2]).toHaveClass("border-gray-300");

    // Second item should have selected styles
    expect(items[1]).toHaveClass("border-green-500");
  });

  test("calls onSelect with correct answer when an item is clicked", () => {
    const handleSelect = jest.fn<void, [Answer]>();
    render(
      <AnswerList options={options} selected={null} onSelect={handleSelect} />
    );

    const items = screen.getAllByTestId("answer-item");
    // Click the third item (Option C)
    fireEvent.click(items[2]);

    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(handleSelect).toHaveBeenCalledWith(options[2]);
  });
});
