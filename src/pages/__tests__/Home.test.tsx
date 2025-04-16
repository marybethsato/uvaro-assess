import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { MemoryRouter } from "react-router-dom";
import Home from "../Home";


// Mock data
const mockUser = {
  data: {
    getUser: {
      userId: 1,
      firstName: "Mary",
      lastName: "Beth",
    },
  },
};

const mockAssessments = {
  data: {
    getUserAssessments: [
      {
        assessmentId: 101,
        startDateTime: new Date().toISOString(),
        endDateTime: new Date().toISOString(),
      },
      {
        assessmentId: 102,
        startDateTime: new Date().toISOString(),
        endDateTime: null,
      },
    ],
  },
};

const mockAddAssessment = {
  data: {
    addAssessment: {
      assessmentId: 999,
    },
  },
};

beforeEach(() => {
  fetchMock.resetMocks();
  localStorage.clear();
});

describe("Home Component", () => {
  test("fetches user and assessments on mount", async () => {
    fetchMock
      .mockResponseOnce(JSON.stringify(mockUser)) // GET_USER
      .mockResponseOnce(JSON.stringify(mockAssessments)); // GET_USER_ASSESSMENTS

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    expect(await screen.findByText("Mary Beth")).toBeInTheDocument();
    expect(await screen.findByText(/Start a New Assessment/i)).toBeInTheDocument();
  });

  test("calls ADD_ASSESSMENT and navigates on button click", async () => {
    fetchMock
      .mockResponseOnce(JSON.stringify(mockUser)) // GET_USER
      .mockResponseOnce(JSON.stringify(mockAssessments)) // GET_USER_ASSESSMENTS
      .mockResponseOnce(JSON.stringify(mockAddAssessment)); // ADD_ASSESSMENT

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    const startButton = screen.getByRole("button", {
      name: /start a new assessment/i,
    });
    fireEvent.click(startButton);

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(3);
      expect(localStorage.getItem("assessmentId")).toBe("999");
    });
  });

  test("handles API failure gracefully", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    fetchMock
      .mockRejectOnce(new Error("User fetch failed"))
      .mockRejectOnce(new Error("Assessments fetch failed"));

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });
});
