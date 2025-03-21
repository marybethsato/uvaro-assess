import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Assessment from "../../interfaces/assessment";
import { formatDate, getOrdinalAssessmentLabel } from "../home/PreviousAssessments";
import TopNavBar from "../navigation/TopNavBar";
import AssessmentCard from "./AssessmentCard";

interface PreviousAssessmentsProps {
  assessments: Assessment[];
}

const PreviousAssessments: React.FC<PreviousAssessmentsProps> = ({ assessments }) => {
  const [sortedAssessments, setSortedAssessments] = useState<Assessment[]>(assessments);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const navigate = useNavigate();

  useEffect(() => {
    setSortedAssessments(assessments);
  }, [assessments]);

  function goToResults(id: string) {
    localStorage.setItem("assessmentId", id);
    navigate("/result?assessmentId=" + id);
  }

  // 🧠 Step 1: Create a consistent ordinal label map (chronological by end_date_time)
  const ordinalLabelMap: Record<number, string> = {};

  [...assessments]
    .sort((a, b) => new Date(a.end_date_time).getTime() - new Date(b.end_date_time).getTime())
    .forEach((assessment, index) => {
      ordinalLabelMap[assessment.id] = getOrdinalAssessmentLabel(index);
    });

  // 🔁 Toggle sort order
  const handleSort = () => {
    const newOrder = sortOrder === "asc" ? "desc" : "asc";
    const sorted = [...sortedAssessments].sort((a, b) => {
      const dateA = new Date(typeof a.end_date_time === "string" ? parseInt(a.end_date_time) : a.end_date_time).getTime();
      const dateB = new Date(typeof b.end_date_time === "string" ? parseInt(b.end_date_time) : b.end_date_time).getTime();

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
        {sortedAssessments.map((assessment) => (
          <AssessmentCard
            key={assessment.id}
            onClick={() => goToResults(assessment.id.toString())}
            title={ordinalLabelMap[assessment.id]} // ✅ stays consistent
            date={formatDate(assessment.end_date_time)}
            description={"Tap to learn more!"}
          />
        ))}
      </div>
    </div>
  );
};

export default PreviousAssessments;
