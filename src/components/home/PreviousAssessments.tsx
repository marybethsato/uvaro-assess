import React from "react";
import { useNavigate } from "react-router-dom";
import Assessment from "../../interfaces/assessment";
import AssessmentCard from "../assessment_list/AssessmentCard";

interface PreviousAssessmentProps {
  assessments: Assessment[];
}

// Converts a value to a Date object, handling string, number, or Date input
export const toDate = (date: string | number | Date): Date => {
  if (date instanceof Date) return date;
  return new Date(typeof date === "string" ? parseInt(date) : date);
};

// Formats a date to "Nov 10, 2023"
export const formatDate = (date: string | number | Date): string => {
  const d = toDate(date);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Converts index to "1st Assessment", "2nd Assessment", etc.
export const getOrdinalAssessmentLabel = (
  index: number,
  isOngoing?: boolean
): string => {
  const number = index + 1;

  const getOrdinalSuffix = (n: number) => {
    const j = n % 10,
      k = n % 100;

    if (j === 1 && k !== 11) return `${n}st`;
    if (j === 2 && k !== 12) return `${n}nd`;
    if (j === 3 && k !== 13) return `${n}rd`;
    return `${n}th`;
  };

  return `${getOrdinalSuffix(number)}${isOngoing ? " Ongoing" : ""} Assessment`;
};

const PreviousAssessments: React.FC<PreviousAssessmentProps> = ({
  assessments,
}) => {
  const navigate = useNavigate();

  function goToResults(id: string) {
    localStorage.setItem("assessmentId", id);
    navigate("/result?assessmentId=" + id);
  }

  // Step 1: Sort all assessments chronologically (oldest → newest)
  const chronological = [...assessments].sort(
    (a, b) => toDate(a.endDateTime).getTime() - toDate(b.endDateTime).getTime()
  );

  // Step 2: Build ordinal title map from original chronological order
  const ordinalLabelMap: Record<number, string> = {};
  chronological.forEach((assessment, index) => {
    ordinalLabelMap[assessment.assessmentId] = getOrdinalAssessmentLabel(index);
  });

  // Step 3: Get the 3 most recent assessments (newest → oldest)
  const mostRecentThree = [...assessments]
    .sort((a, b) => toDate(b.endDateTime).getTime() - toDate(a.endDateTime).getTime())
    .slice(0, 3);

  return (
    mostRecentThree.length === 0 ? <div>

    </div> :
      <div className="mt-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-m font-bold">Previous Assessment</h2>
          <a href="/app/assessment-list" className="text-sm text-red-600 hover:underline">
            View all
          </a>
        </div>

        {/* Render the most recent 3 assessments with correct ordinal titles */}
        {mostRecentThree.map((assessment) => (
          <AssessmentCard
            key={assessment.assessmentId}
            onClick={() => goToResults(assessment.assessmentId.toString())}
            title={ordinalLabelMap[assessment.assessmentId]} // ✅ consistent title
            date={formatDate(assessment.endDateTime)}
            description="Tap to learn more!"
          />
        ))}
      </div>
  );
};

export default PreviousAssessments;
