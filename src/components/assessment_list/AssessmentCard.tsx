import React from 'react';

interface AssessmentCardProps {
  title: string;
  date: string;
  description: string;
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({ title, date, description }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-2">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold">{title}</h3>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
    </div>
  );
};

export default AssessmentCard;
