import { fireEvent, render, screen } from "@testing-library/react";
import Note from "../../assessment/NoteCard";

describe("Note component", () => {
  const questionId = 1;

  test("renders textarea with correct placeholder", () => {
    render(<Note questionId={questionId} onNoteChange={() => {}} />);
    const textarea = screen.getByPlaceholderText("Add a note...");
    expect(textarea).toBeInTheDocument();
  });

  test("calls onNoteChange when textarea value changes", () => {
    const handleNoteChange = jest.fn<void, [number, string]>();

    render(<Note questionId={questionId} onNoteChange={handleNoteChange} />);
    const textarea = screen.getByPlaceholderText("Add a note...");

    fireEvent.change(textarea, { target: { value: "New note" } });

    expect(textarea).toHaveValue("New note");

    expect(handleNoteChange).toHaveBeenCalledTimes(1);
    expect(handleNoteChange).toHaveBeenCalledWith(questionId, "New note");
  });
});
