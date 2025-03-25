import React from "react";
import { useNavigate } from "react-router-dom";

interface ReminderWidgetProps {
    lastAssessmentDate: string; // Empty string means no assessment taken yet
    onStartAssessment: () => void;
}

const ReminderComponent: React.FC<ReminderWidgetProps> = ({
    lastAssessmentDate,
    onStartAssessment,
}) => {
    const navigate = useNavigate();

    const currentDate = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);

    const hasNoAssessment = lastAssessmentDate === '';
    const lastDate = hasNoAssessment ? null : new Date(lastAssessmentDate);
    const isDue = hasNoAssessment || (lastDate && lastDate <= threeMonthsAgo);

    return isDue ? (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-lg shadow-md mt-4">
            <h3 className="text-lg font-semibold">Assessment Reminder</h3>
            <p className="text-sm mt-2">
                {hasNoAssessment
                    ? "You haven't taken any assessments yet. Start one now to check your career progression!"
                    : "It's been 3 months since your last assessment. It's time to take a new one!"}
            </p>

            <div className="flex justify-end mt-3">
                <button
                    onClick={onStartAssessment}
                    className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-blue-700 transition"
                >
                    Start Assessment
                </button>
            </div>
        </div>
    ) : null;
};

export default ReminderComponent;
