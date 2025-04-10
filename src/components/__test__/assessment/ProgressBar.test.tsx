// src/components/__tests__/ProgressBar.test.tsx
import React from "react";
import { render, screen } from "@testing-library/react";
import ProgressBar from "../../assessment/ProgressBar";

interface Category {
  name: string;
  totalQuestions: number;
  answered: number;
}

describe("ProgressBar component", () => {
  const categories: Category[] = [
    { name: "Category A", totalQuestions: 10, answered: 2 },
    { name: "Category B", totalQuestions: 5, answered: 5 },
    { name: "Category C", totalQuestions: 4, answered: 1 },
  ];

  test("renders one circle per category with correct labels", () => {
    render(<ProgressBar categories={categories} activeCategoryIndex={1} />);
    categories.forEach((cat) => {
      expect(screen.getByText(cat.name)).toBeInTheDocument();
    });
    const percentTexts = screen.getAllByText(/%$/);
    expect(percentTexts).toHaveLength(categories.length);
  });

  test("prior steps show 100% regardless of answered/total", () => {
    render(<ProgressBar categories={categories} activeCategoryIndex={2} />);
    expect(screen.getAllByText("100%")).toHaveLength(2);
  });

  test("current and future steps show computed percentage", () => {
    render(<ProgressBar categories={categories} activeCategoryIndex={1} />);

    expect(screen.getAllByText("100%")).toHaveLength(2);
    expect(screen.getByText("25%")).toBeInTheDocument();
  });
});
