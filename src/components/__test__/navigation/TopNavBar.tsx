import { render, screen, fireEvent } from "@testing-library/react";
import TopNavBar from "../../navigation/TopNavBar";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  __esModule: true,
  useNavigate: () => mockNavigate,
}));

describe("TopNavBar component", () => {
  afterEach(() => {
    mockNavigate.mockClear();
  });

  test("renders light mode by default", () => {
    render(<TopNavBar />);
    const container = screen.getByRole("button").parentElement!;
    expect(container).toHaveClass("text-black");
  });

  test("renders dark mode when isDark=true", () => {
    render(<TopNavBar isDark />);
    const container = screen.getByRole("button").parentElement!;
    expect(container).toHaveClass("bg-black", "text-white", "p-3");
  });

  test("clicking back button calls navigate(-1)", () => {
    render(<TopNavBar />);
    const backButton = screen.getByRole("button");
    fireEvent.click(backButton);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
