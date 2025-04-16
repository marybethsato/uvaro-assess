import { render, screen, fireEvent } from "@testing-library/react";
import ProfileImage from "../../home/ProfileImage";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  __esModule: true,
  useNavigate: () => mockNavigate,
}));

describe("ProfileImage component", () => {
  const url = "http://example.com/avatar.png";

  afterEach(() => {
    mockNavigate.mockClear();
  });

  test("renders img with correct src, alt, and default size", () => {
    render(<ProfileImage url={url} />);
    const img = screen.getByAltText("Profile") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(url);

    expect(img).toHaveStyle({ width: "56px", height: "56px" });
    expect(img).toHaveClass("rounded-full", "object-cover");
  });

  test("renders img with custom size when size prop is provided", () => {
    render(<ProfileImage url={url} size={100} />);
    const img = screen.getByAltText("Profile") as HTMLImageElement;
    expect(img).toHaveStyle({ width: "100px", height: "100px" });
  });

  test("clicking the image navigates to settings", () => {
    render(<ProfileImage url={url} />);
    const img = screen.getByAltText("Profile");
    fireEvent.click(img);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith("/app/settings");
  });
});
