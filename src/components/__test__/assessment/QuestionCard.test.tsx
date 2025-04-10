import React from "react";
import { render, screen } from "@testing-library/react";
import Question from "../../assessment/QuestionCard";

describe("Question component", () => {
  const props = {
    number: 3,
    total: 10,
    category: "Financial Health",
    question: "How do you feel about your spending?",
  };

  test("renders category with correct styling", () => {
    render(<Question {...props} />);
    const category = screen.getByText(props.category);
    expect(category).toBeInTheDocument();
    expect(category).toHaveClass(
      "text-red-500",
      "font-semibold",
      "text-sm",
      "mb-5"
    );
  });

  test("renders question text", () => {
    render(<Question {...props} />);
    const questionText = screen.getByText(props.question);
    expect(questionText).toBeInTheDocument();
    expect(questionText).toHaveClass("text-lg");
  });
});
