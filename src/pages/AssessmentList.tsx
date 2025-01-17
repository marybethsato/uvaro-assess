// src/pages/AssessmentList.tsx
import React from 'react';
import PreviousAssessments from '../components/assessment_list/PreviousAssessments';


const AssessmentList: React.FC = () => {
  const assessments = [
    {
      title: 'First Assessment',
      date: 'Nov 10, 2023',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      title: 'Second Assessment',
      date: 'Nov 12, 2023',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    },
    {
      title: 'Third Assessment',
      date: 'Nov 15, 2023',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit.',
    },

    {
      title: 'Fourth Assessment',
      date: 'Nov 10, 2023',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      title: 'Fifth Assessment',
      date: 'Nov 12, 2023',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    },
    {
      title: 'Sixth Assessment',
      date: 'Nov 15, 2023',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit.',
    },
    {
      title: 'Seventh Assessment',
      date: 'Nov 20, 2023',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      title: 'Eight Assessment',
      date: 'Nov 22, 2023',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
    },
    {
      title: 'Ninth Assessment',
      date: 'Nov 30, 2023',
      description: 'Duis aute irure dolor in reprehenderit in voluptate velit.',
    },
  ];

  return (
    <div className='p-6 mb-[70px]'>
      <PreviousAssessments assessments={assessments} />
    </div>
  );
};

export default AssessmentList;
