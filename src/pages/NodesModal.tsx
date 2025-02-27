import { X } from "lucide-react";
import React, { useState } from "react";

interface NotesModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (note: string) => void;
}

const NotesModal: React.FC<NotesModalProps> = ({ isOpen, onClose, onSave }) => {
    const [note, setNote] = useState("");

    if (!isOpen) return null; // Hide modal when it's closed

    const handleSave = () => {
        onSave(note);
        setNote(""); 
        onClose(); 
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-lg shadow-lg w-96 relative">
                {/* Close button (Exit icon) */}
                <button className="absolute top-2 right-2" onClick={onClose}>
                    <X size={20} className="text-gray-600 hover:text-gray-800" />
                </button>

                <h2 className="text-lg font-bold mb-3">Add Notes</h2>

                {/* Notes Textbox */}
                <textarea
                    className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Enter your notes..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={4}
                ></textarea>

                {/* Save Button */}
                <button
                    className="mt-3 bg-green-custom text-white px-4 py-2 rounded-md w-full hover:bg-green-custom-600"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default NotesModal;
