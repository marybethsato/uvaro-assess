import React, { useState } from "react";
import AssessmentCard from "./AssessmentCard";
import TopNavBar from "../navigation/TopNavBar";

interface Assessment {
  title: string;
  date: string; // Ensure dates are in a format that can be sorted, e.g., 'YYYY-MM-DD'
  description: string;
}

interface PreviousAssessmentsProps {
  assessments: Assessment[];
}

const PreviousAssessments: React.FC<PreviousAssessmentsProps> = ({
  assessments,
}) => {
  const [sortedAssessments, setSortedAssessments] =
    useState<Assessment[]>(assessments);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // Sort order state

  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    const sorted = [...sortedAssessments].sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return newOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setSortedAssessments(sorted);
    setSortOrder(newOrder);
  };

  return (
    <div>
      <TopNavBar />
      <div className="mt-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-m font-bold">Previous Assessments</h2>
          <button
            onClick={handleSort}
            className="text-sm text-red-600 focus:outline-none"
          >
            Sort ({sortOrder === "asc" ? "Oldest First" : "Newest First"})
          </button>
        </div>

        {/* Render Assessment Cards */}
        {sortedAssessments.map((assessment, index) => (
          <AssessmentCard
            key={index}
            title={assessment.title}
            date={assessment.date}
            description={assessment.description}
          />
        ))}
      </div>
    </div>
  );
};

export default PreviousAssessments;
