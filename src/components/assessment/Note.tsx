import React from "react";

export default function Note() {
  return (
    <div className="mt-9">
      <label className="font-semibold text-sm">Notes (optional)</label>
      <textarea
        className="w-full h-40 border border-gray-300 p-3 my-3 rounded-md"
        placeholder="Add a note..."
      ></textarea>
    </div>
  );
}
