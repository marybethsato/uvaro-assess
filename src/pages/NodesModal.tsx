import { X } from "lucide-react";
import React, { useState } from "react";
import BaseButton from "../components/buttons/BaseButton";

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: string) => void;
  onSkip: () => void;
}

const NotesModal: React.FC<NotesModalProps> = ({
  isOpen,
  onClose,
  onSave,
  onSkip,
}) => {
  const [note, setNote] = useState("");

  if (!isOpen) return null;

  const handleSave = () => {
    if (note) {
      onSave(note);
      setNote("");
      onClose();
    } else {
      alert("Please type something to save.");
    }
  };

  const handleSkip = () => {
    onSkip();
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg w-96 relative">
        {/* Close button (Exit icon) */}
        <button className="absolute top-2 right-2" onClick={onClose}>
          <X size={20} className="text-gray-600 hover:text-gray-800" />
        </button>

        <h2 className="text-lg font-bold mb-3">
          Do you want to add details? (optional)
        </h2>

        {/* Notes Textbox */}
        <textarea
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter your notes..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={4}
        ></textarea>

        {/* Save Button */}
        <div className="flex gap-3 mt-3">
          <BaseButton className="flex-1 white-button" onClick={handleSkip}>
            Skip
          </BaseButton>
          <BaseButton className="flex-1 green-button" onClick={handleSave}>
            Save
          </BaseButton>
        </div>
      </div>
    </div>
  );
};

export default NotesModal;
