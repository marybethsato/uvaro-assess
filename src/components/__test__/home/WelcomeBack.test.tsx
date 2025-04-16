import { render, screen } from "@testing-library/react";
import WelcomeBack from "../../home/WelcomeBack";

jest.mock("../../home/ProfileImage", () => ({
  __esModule: true,
  default: ({ url }: { url: string }) => (
    <img data-testid="profile-img" src={url} alt="profile" />
  ),
}));

describe("WelcomeBack component", () => {
  const name = "Alice";
  const profileUrl = "http://example.com/avatar.png";

  test("renders greeting and user name", () => {
    render(<WelcomeBack name={name} profileUrl={profileUrl} />);
    expect(screen.getByText("Welcome back")).toBeInTheDocument();
    expect(screen.getByText(name)).toBeInTheDocument();
  });

  test("renders ProfileImage with correct src", () => {
    render(<WelcomeBack name={name} profileUrl={profileUrl} />);
    const img = screen.getByTestId("profile-img") as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(profileUrl);
    expect(img.alt).toBe("profile");
  });
});
