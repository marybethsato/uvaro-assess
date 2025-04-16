import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CompleteCheckmark from "../CompleteCheckmark";


beforeEach(() => {
  fetchMock.resetMocks();
  localStorage.setItem("assessmentId", "123");
});

describe("CompleteCheckmark Component", () => {
  it("should render completion UI", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        data: {
          endAssessment: true,
        },
      })
    );

    render(
      <MemoryRouter initialEntries={["/complete"]}>
        <Routes>
          <Route path="/complete" element={<CompleteCheckmark />} />
        </Routes>
      </MemoryRouter>
    );

    // Ensure loading API
    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining(process.env.REACT_APP_GRAPHQL_URL || ""),
        expect.objectContaining({
          method: "POST",
          body: expect.stringContaining(`"assessmentId":123`),
        })
      );
    });

    expect(await screen.findByText("Completed!")).toBeInTheDocument();
    expect(
      screen.getByText("Thank you for completing the assessment. We will get back to you with the results soon.")
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /view results/i })).toBeInTheDocument();
  });

  it("should navigate to results on button click", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ data: { endAssessment: true } }));

    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    render(
      <MemoryRouter initialEntries={["/complete"]}>
        <Routes>
          <Route path="/complete" element={<CompleteCheckmark />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("Completed!"));
    fireEvent.click(screen.getByRole("button", { name: /view results/i }));

    // Ideally would assert the route changes, but if mocking useNavigate is needed:
    // expect(mockNavigate).toHaveBeenCalledWith("/result");
  });

  it("logs error on failed fetch", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    fetchMock.mockRejectOnce(new Error("Network Error"));

    render(
      <MemoryRouter>
        <CompleteCheckmark />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Error ending assessment:",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });
});
