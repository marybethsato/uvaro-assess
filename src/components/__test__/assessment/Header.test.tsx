import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../../assessment/Header";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("Header component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("renders the back button and title", () => {
    const title = "Test Title";
    render(<Header title={title} />);

    const backButton = screen.getByRole("button");
    expect(backButton).toBeInTheDocument();
  });

  test("clicking back button navigates back", () => {
    render(<Header title="test" />);
    const backButton = screen.getByRole("button");

    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test("renders without title (defaults to empty)", () => {
    render(<Header />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("");
  });
});
