import React, { useEffect, useState } from "react";
import PreviousAssessments from "../components/assessment_list/AllPreviousAssessments";
import { GET_USER_ASSESSMENTS } from "../graphql/queries";
import Assessment from "../interfaces/assessment";

const AssessmentList: React.FC = () => {
  const [assessments, setAssessments] = useState<Assessment[]>([]);

  useEffect(() => {
    setAssessments([]);
    async function getUserAssessments() {
      try {
        const response = await fetch(process.env.REACT_APP_GRAPHQL_URL || "", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: GET_USER_ASSESSMENTS,
          }),
        });

        const result = await response.json();
        if (!response.ok) {
          alert("Error getting assessments");
        }

        result.data.getUserAssessments.forEach((assessment: Assessment) => {
          setAssessments((prev) => {
            const exists = prev.some((a) => a.id === assessment.id);
            if (!exists && assessment.end_date_time != null) {
              return [...prev, assessment];
            }
            return prev;
          });
        });
      } catch (e) {
        console.log(e);
      }
    }

    getUserAssessments();
  }, []);

  return (
    <div className="p-6 mb-[70px]">
      <PreviousAssessments assessments={assessments} />
    </div>
  );
};

export default AssessmentList;
