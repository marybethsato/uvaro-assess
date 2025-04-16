import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ResultCategory from "../ResultCategory";

beforeEach(() => {
  fetchMock.resetMocks();
  localStorage.clear();
});

const mockLevelResponse = {
  data: {
    calculateLevel: {
      levelName: "ADVANCED",
      levelStatement: "You're doing great in this category!",
    },
  },
};

const mockNotesResponse = {
  data: {
    insertNote: {
      success: true,
    },
  },
};

describe("ResultCategory Component", () => {
  test("calls CALCULATE_LEVEL_GUEST if not logged in", async () => {
    const answers = [1, 2, 3];
    localStorage.setItem("3", JSON.stringify(answers)); // "career-growth" has index 2 + 1
    fetchMock.mockResponseOnce(JSON.stringify(mockLevelResponse));

    render(
      <MemoryRouter initialEntries={["/result-category/career-growth"]}>
        <Routes>
          <Route
            path="/result-category/:category"
            element={<ResultCategory />}
          />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "POST",
          body: expect.stringContaining("calculateLevelGuest"),
        })
      );
    });

    expect(await screen.findByText(/ADVANCED/)).toBeInTheDocument();
    expect(screen.getByText("You're doing great in this category!")).toBeInTheDocument();
  });

  test("calls CALCULATE_LEVEL_AUTHENTICATED if logged in", async () => {
    const answers = [4, 5, 6];
    localStorage.setItem("3", JSON.stringify(answers));
    localStorage.setItem("assessmentId", "100");
    localStorage.setItem("isLoggedIn", "true");

    fetchMock.mockResponseOnce(JSON.stringify(mockLevelResponse));

    render(
      <MemoryRouter initialEntries={["/result-category/career-growth"]}>
        <Routes>
          <Route
            path="/result-category/:category"
            element={<ResultCategory />}
          />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "POST",
          body: expect.stringContaining("calculateLevelAuthenticated"),
        })
      );
    });

    expect(await screen.findByText("ADVANCED")).toBeInTheDocument();
    expect(screen.getByText("You're doing great in this category!")).toBeInTheDocument();
  });

  test("submits notes successfully", async () => {
    localStorage.setItem("assessmentId", "100");
    localStorage.setItem("isLoggedIn", "true");

    fetchMock
      .mockResponseOnce(JSON.stringify(mockLevelResponse)) // initial calculate
      .mockResponseOnce(JSON.stringify(mockNotesResponse)); // insertNote

    render(
      <MemoryRouter initialEntries={["/result-category/career-growth"]}>
        <Routes>
          <Route
            path="/result-category/:category"
            element={<ResultCategory />}
          />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("ADVANCED")).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("This Represents Me"));

    await waitFor(() => {
      expect(screen.getByText("Skip")).toBeInTheDocument(); // Modal is open
    });

    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "These are my notes." },
    });

    fireEvent.click(screen.getByText("Save"));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining("insertNote"),
        })
      );
    });
  });
});
