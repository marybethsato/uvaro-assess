import React from 'react';
import AssessmentCard from '../assessment_list/AssessmentCard';

const OngoingAssessment: React.FC = () => {
  return (
    <div className="mt-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-bold">Continue Assessment</h2>
      </div>

      {/* Assessment Cards */}
      <AssessmentCard
        title="First Assessment"
        date="Started on Nov 12, 2023"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing, sed do.."
      />
    </div>
  );
};

export default OngoingAssessment;
