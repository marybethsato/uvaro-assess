import { render, screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { MemoryRouter } from "react-router-dom";
import Result from "../Result";


beforeEach(() => {
  fetchMock.resetMocks();
  localStorage.clear();
});

const mockAuthenticatedResponse = {
  data: {
    getAssessmentById: {
      levels: [
        {
          categoryId: 1,
          levelName: "BEGINNER",
          levelStatement: "You are just getting started.",
        },
        {
          categoryId: 2,
          levelName: "ADVANCED",
          levelStatement: "You're doing great in this area.",
        },
      ],
    },
  },
};

const mockGuestResult = {
  data: {
    calculateLevel: {
      categoryId: 3,
      levelName: "INTERMEDIATE",
      levelStatement: "You’re on your way!",
    },
  },
};

describe("Result Component", () => {
  test("fetches and displays results for authenticated users", async () => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("assessmentId", "123");

    fetchMock.mockResponseOnce(JSON.stringify(mockAuthenticatedResponse));

    render(
      <MemoryRouter>
        <Result />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining(process.env.REACT_APP_GRAPHQL_URL || ""),
        expect.objectContaining({
          method: "POST",
          body: expect.stringContaining("getAssessmentById"),
        })
      );
    });

    expect(await screen.findByText(/Level 1/)).toBeInTheDocument();
    expect(screen.getByText("You are just getting started.")).toBeInTheDocument();
    expect(screen.getByText("You're doing great in this area.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Book Appointment/i })).toBeInTheDocument();
  });

  test("loads guest results from localStorage", async () => {
    localStorage.removeItem("isLoggedIn");

    localStorage.setItem(
      "3_result",
      JSON.stringify(mockGuestResult)
    );

    render(
      <MemoryRouter>
        <Result />
      </MemoryRouter>
    );

    expect(await screen.findByText("You’re on your way!")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Sign in to Save Assessment/i })).toBeInTheDocument();
  });

  test("redirects to / if no guest results", async () => {
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    render(
      <MemoryRouter>
        <Result />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });
});
