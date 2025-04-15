// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OngoingAssessments from "../components/home/ContinueAssessment";
import PreviousAssessment from "../components/home/PreviousAssessments";
import ProgressChart from "../components/home/ProgressChart";
import ReminderComponent from "../components/home/Reminder";
import WelcomeBack from "../components/home/WelcomeBack";
import { ADD_ASSESSMENT, GET_USER, GET_USER_ASSESSMENTS } from "../graphql/queries";
import Assessment from "../interfaces/assessment";
import User from "../interfaces/user";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const rProfileUrl = "https://avatar.iran.liara.run/public/98";


  const getLatestAssessment = (assessments: Assessment[]): Assessment | undefined => {
    return assessments.reduce((latest, current) => {
      const latestDate = new Date(latest.startDateTime).getTime();
      const currentDate = new Date(current.startDateTime).getTime();
      return currentDate > latestDate ? current : latest;
    }, assessments[0]);
  };

  const [allAssessments, setAllAssessments] = useState<Assessment[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [latestAssessment, setLatestAssessment] = useState<Assessment>();
  const [user, setUser] = useState<User>();

  const formatToYMD = (date: string | number | Date): string => {
    const d = new Date(typeof date === "string" ? parseInt(date) : date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    const day = d.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

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
          alert('Error getting assessments');
        }

        result.data.getUserAssessments.forEach((assessment: Assessment) => {
          setAllAssessments(prev => {
            const exists = prev.some(a => a.assessmentId === assessment.assessmentId);
            if (!exists) {
              return [...prev, assessment];
            }
            return prev;
          });

          setAssessments(prev => {
            const exists = prev.some(a => a.assessmentId === assessment.assessmentId);
            if (!exists && assessment.endDateTime != null) {
              return [...prev, assessment];
            }
            return prev;
          });
        });

        setLatestAssessment(getLatestAssessment(assessments));

      } catch (e) {
        console.log(e);
      }
    };

    async function getUser() {
      try {
        const response = await fetch(process.env.REACT_APP_GRAPHQL_URL || "", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: GET_USER,

          }),
        });

        const result = await response.json();
        if (!response.ok) {
          console.log(response);
          alert('Error getting assessments');
        }


        setUser(result.data.getUser);
        localStorage.setItem('isLoggedIn', 'true');

      } catch (e) {
        console.log(e);
      }
    };
    getUser();
    getUserAssessments();
  }, []);

  async function handleAssessment() {
    try {
      console.log(process.env.REACT_APP_GRAPHQL_URL);
      const res = await fetch(process.env.REACT_APP_GRAPHQL_URL || "", {
        method: "POST",
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: ADD_ASSESSMENT,
        }),
      });
      const data = await res.json();

      if (data.errors) {
        console.log("Failed to add assessment as guest: ", data.errors);
        alert("Failed to start assessment: " + data.errors);
      } else {
        localStorage.setItem("assessmentId", data.data.addAssessment.assessmentId);
        navigate("/introduction/financial-health")
      }
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className="p-6 mb-[70px]">
      <WelcomeBack profileUrl={rProfileUrl} name={user != null ? (user?.firstName + ' ' + user?.lastName) : ''}></WelcomeBack>
      <ReminderComponent onStartAssessment={() => handleAssessment()} lastAssessmentDate={formatToYMD(latestAssessment?.endDateTime ?? '')}></ReminderComponent>
      <ProgressChart assessments={assessments} />
      <button
        onClick={handleAssessment}
        className="w-full px-4 py-3 mt-8 mb-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
      >
        Start a New Assessment
      </button>
      <OngoingAssessments assessments={allAssessments.filter(
        (a) => a.endDateTime === null || a.endDateTime === undefined
      )} />
      <PreviousAssessment assessments={assessments} />
    </div>
  );
};

export default Home;


