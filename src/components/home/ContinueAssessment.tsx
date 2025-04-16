import React from 'react';
import { useNavigate } from 'react-router-dom';
import Assessment from '../../interfaces/assessment';
import getCategoryKeyByIndex from '../../utils/get_category_key_by_index';
import AssessmentCard from '../assessment_list/AssessmentCard';
import { formatDate, getOrdinalAssessmentLabel } from './PreviousAssessments';


interface OngoingAssessmentProps {
  assessments: Assessment[];
}

const OngoingAssessments: React.FC<OngoingAssessmentProps> = ({ assessments }) => {
  const navigate = useNavigate();


  function onClickOngoingAssessment(id: string, assessment: Assessment) {
    localStorage.setItem("assessmentId", id);
    navigate("/introduction/"+ getCategoryKeyByIndex(assessment.levels.length))
  }


  return (
    assessments.length === 0 ? <div></div>:
    <div className="mt-5">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-bold">Continue Assessment</h2>
      </div>

      {/* Assessment Cards */}
      {assessments.map((assessment, index) => (

        <AssessmentCard
          key={index}
          onClick={()=> onClickOngoingAssessment(assessment.assessmentId.toString(), assessment)}
          title={getOrdinalAssessmentLabel(index, true)}
          date={'Started ' +(formatDate(assessment.startDateTime))}
          description={'Tap to continue!'}
          isOngoing={true}
        />
      ))}
    </div>
  );
};

export default OngoingAssessments;
