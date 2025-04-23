import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Assessment from "../../interfaces/assessment";
import {
  formatDate,
  getOrdinalAssessmentLabel,
} from "../home/PreviousAssessments";
import TopNavBar from "../navigation/TopNavBar";
import AssessmentCard from "./AssessmentCard";

interface PreviousAssessmentsProps {
  assessments: Assessment[];
}

const PreviousAssessments: React.FC<PreviousAssessmentsProps> = ({
  assessments,
}) => {
  const [sortedAssessments, setSortedAssessments] =
    useState<Assessment[]>(assessments);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const navigate = useNavigate();

  useEffect(() => {
    setSortedAssessments(assessments);
  }, [assessments]);

  function goToResults(id: string) {
    localStorage.setItem("assessmentId", id);
    navigate("/result?assessmentId=" + id);
  }

  // 🧠 Step 1: Create a consistent ordinal label map (chronological by endDateTime)
  const ordinalLabelMap: Record<number, string> = {};

  [...assessments]
    .sort(
      (a, b) =>
        new Date(a.endDateTime).getTime() - new Date(b.endDateTime).getTime()
    )
    .forEach((assessment, index) => {
      ordinalLabelMap[assessment.assessmentId] =
        getOrdinalAssessmentLabel(index);
    });

  // Toggle sort order
  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    const sorted = [...sortedAssessments].sort((a, b) => {
      const dateA = new Date(
        typeof a.endDateTime === "string"
          ? parseInt(a.endDateTime)
          : a.endDateTime
      ).getTime();
      const dateB = new Date(
        typeof b.endDateTime === "string"
          ? parseInt(b.endDateTime)
          : b.endDateTime
      ).getTime();

      return newOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

    setSortedAssessments(sorted);
    setSortOrder(newOrder);
  };

  return assessments.length === 0 ? (
    <div>
      <h2>No assessment yet...</h2>
    </div>
  ) : (
    <div>
      <TopNavBar />
      <div className="pt-12">
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
        {sortedAssessments.map((assessment) => (
          <AssessmentCard
            key={assessment.assessmentId}
            onClick={() => goToResults(assessment.assessmentId.toString())}
            title={ordinalLabelMap[assessment.assessmentId]} // ✅ stays consistent
            date={formatDate(assessment.endDateTime)}
            description={"Tap to learn more!"}
          />
        ))}
      </div>
    </div>
  );
};

export default PreviousAssessments;
