import { render, screen, fireEvent } from "@testing-library/react";
import AssessmentCard from "../../assessment_list/AssessmentCard";

describe("AssessmentCard component", () => {
  const props = {
    title: "Test Title",
    date: "2025-04-10",
    description: "Test description",
    onClick: jest.fn(),
  };

  afterEach(() => {
    props.onClick.mockClear();
  });

  test("renders title, date, and description", () => {
    render(<AssessmentCard {...props} />);
    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.date)).toBeInTheDocument();
    expect(screen.getByText(props.description)).toBeInTheDocument();
  });

  test("calls onClick when container is clicked", () => {
    render(<AssessmentCard {...props} />);
    const container = screen.getByTestId("assessment-card");
    fireEvent.click(container);
    expect(props.onClick).toHaveBeenCalled();
  });

  test('does not render "Continue" button when isOngoing is false or undefined', () => {
    render(<AssessmentCard {...props} />);
    expect(screen.queryByRole("button", { name: /Continue/i })).toBeNull();
  });

  test('renders "Continue" button when isOngoing is true', () => {
    render(<AssessmentCard {...props} isOngoing />);
    const btn = screen.getByRole("button", { name: /Continue/i });
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveClass("bg-blue-500");
  });

  test('calls onClick when "Continue" button is clicked', () => {
    render(<AssessmentCard {...props} isOngoing />);
    const btn = screen.getByRole("button", { name: /Continue/i });
    fireEvent.click(btn);
    expect(props.onClick).toHaveBeenCalledTimes(1);
  });
});
