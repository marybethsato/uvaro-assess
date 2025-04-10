import React from "react";

interface AssessmentCardProps {
  title: string;
  date: string;
  description: string;
  isOngoing?: boolean;
  onClick: () => void;
}

const AssessmentCard: React.FC<AssessmentCardProps> = ({
  title,
  date,
  description,
  isOngoing,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      data-testid="assessment-card"
      className="bg-white shadow rounded-lg p-4 mb-2"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold">{title}</h3>
        <p className="text-sm text-gray-500">{date}</p>
      </div>
      <p className="text-sm text-gray-600 mt-2">{description}</p>
      {isOngoing && (
        <div className="flex justify-end mt-3">
          <button className="px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600">
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default AssessmentCard;
