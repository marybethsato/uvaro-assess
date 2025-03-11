// src/pages/Home.tsx
import React from "react";
import OngoingAssessment from "../components/home/ContinueAssessment";
import PreviousAssessment from "../components/home/PreviousAssessments";
import ProgressChart from "../components/home/ProgressChart";
import WelcomeBack from "../components/home/WelcomeBack";

const Home: React.FC = () => {
  const rProfileUrl = "https://avatar.iran.liara.run/public/98";
  const rName = "Jane Doe";

  const assessments = [
    {
      title: "First Assessment",
      date: "Nov 10, 2023",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      title: "Second Assessment",
      date: "Nov 12, 2023",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco.",
    },
    {
      title: "Third Assessment",
      date: "Nov 15, 2023",
      description: "Duis aute irure dolor in reprehenderit in voluptate velit.",
    },
  ];

  return (
    <div className="p-6 mb-[70px]">
      <WelcomeBack profileUrl={rProfileUrl} name={rName}></WelcomeBack>
      <ProgressChart />
      <OngoingAssessment />
      <PreviousAssessment assessments={assessments} />
    </div>
  );
};

export default Home;
