import React from 'react';
import AssessmentCard from '../assessment_list/AssessmentCard';


interface Assessment {
  title: string;
  date: string;
  description: string;
}

interface PreviousAssessmentProps {
  assessments: Assessment[];
}

const PreviousAssessments: React.FC<PreviousAssessmentProps> = ({ assessments }) => {
  return (
    <div className="mt-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-m font-bold">Previous Assessment</h2>
        <a href="/app/assessment-list" className="text-sm text-red-600 hover:underline">
          View all
        </a>
      </div>

      {/* Render Assessment Cards */}
      {assessments.map((assessment, index) => (
        <AssessmentCard
          key={index}
          title={assessment.title}
          date={assessment.date}
          description={assessment.description}
        />
      ))}
    </div>
  );
};

export default PreviousAssessments;
