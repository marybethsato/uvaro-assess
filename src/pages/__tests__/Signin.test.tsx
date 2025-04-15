import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import Signin from "../Signin";


beforeEach(() => {
  fetchMock.resetMocks();
  delete (window as any).location;
  window.location = { origin: "http://localhost", href: "" } as any;
  process.env.REACT_APP_BACKEND_URL = "https://fake-backend.com";
});

describe("Signin Component", () => {
  test("makes API call and redirects on Sign In", async () => {
    const mockRedirectUrl = "https://fake-backend.com/redirect-to-home";
    fetchMock.mockResponseOnce('', {
      status: 302,
      headers: {
        Location: mockRedirectUrl,
      },
      url: mockRedirectUrl,
    });

    render(<Signin />);

    const signInButton = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining("/login?referer=http://localhost/app/home"),
        expect.objectContaining({
          method: "GET",
          credentials: "include",
          redirect: "manual",
        })
      );
      expect(window.location.href).toBe(mockRedirectUrl);
    });
  });

  test("toggles to Sign Up view", () => {
    render(<Signin />);
    const toggle = screen.getByRole("button", { name: /sign up/i });

    fireEvent.click(toggle);

    expect(screen.getByText(/sign up to continue/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });
});
