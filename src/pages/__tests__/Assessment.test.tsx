import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Assessment from '../Assessment';

// Mock fetch
beforeEach(() => {
    fetchMock.resetMocks();
});

const mockCategoryData = {
    data: {
        allCategories: [
            {
                categoryId: 1,
                categoryName: "Financial Health",
                questions: [
                    {
                        questionId: 101,
                        questionText: "How do you rate your financial health?",
                        followUp: false,
                        answers: [
                            {
                                answerId: 1,
                                answerText: "Excellent"
                            },
                            {
                                answerId: 2,
                                answerText: "Poor"
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

describe("Assessment Component", () => {
    test("fetches and displays questions", async () => {
        fetchMock.mockResponseOnce(JSON.stringify(mockCategoryData));

        render(
            <MemoryRouter initialEntries={["/assessment?category=financial-health&is_follow_up=false"]}>
                <Routes>
                    <Route path="/assessment" element={<Assessment />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledWith(
                expect.stringContaining(process.env.REACT_APP_GRAPHQL_URL || ""),
                expect.objectContaining({
                    method: "POST",
                })
            );
        });

        expect(await screen.findByText("How do you rate your financial health?")).toBeInTheDocument();
        expect(await screen.findByText("Excellent")).toBeInTheDocument();
        expect(await screen.findByText("Poor")).toBeInTheDocument();
    });

    test("handles fetch failure", async () => {
        fetchMock.mockRejectOnce(new Error("Failed to fetch"));

        render(
            <MemoryRouter initialEntries={["/assessment?category=financial-health&is_follow_up=false"]}>
                <Routes>
                    <Route path="/assessment" element={<Assessment />} />
                </Routes>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalled();
        });

        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });
});
