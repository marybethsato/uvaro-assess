import React, { ChangeEvent, useEffect, useState } from "react";

interface NoteProps {
  questionId: number;
  onNoteChange: (questionId: number, newContent: string) => void;
  existingNote?: string;
}

export default function Note({
  questionId,
  onNoteChange,
  existingNote,
}: NoteProps) {
  const [note, setNote] = useState<string>(existingNote || "");

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newNote = e.target.value;
    setNote(newNote);
    onNoteChange(questionId, newNote);
  };

  useEffect(() => {
    setNote(existingNote || "");
  }, [existingNote]);

  return (
    <div className="mt-9">
      <label className="font-semibold text-sm">Notes (optional)</label>
      <textarea
        className="w-full h-40 border border-gray-300 p-3 my-3 rounded-md"
        placeholder="Add a note..."
        value={note}
        onChange={handleChange}
      ></textarea>
    </div>
  );
}
