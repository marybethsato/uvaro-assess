// src/pages/Home.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OngoingAssessments from "../components/home/ContinueAssessment";
import PreviousAssessment from "../components/home/PreviousAssessments";
import ProgressChart from "../components/home/ProgressChart";
import ReminderComponent from "../components/home/Reminder";
import WelcomeBack from "../components/home/WelcomeBack";
import {
  ADD_ASSESSMENT,
  GET_USER,
  GET_USER_ASSESSMENTS,
} from "../graphql/queries";
import Assessment from "../interfaces/assessment";
import User from "../interfaces/user";

const Home: React.FC = () => {
  const navigate = useNavigate();

  // URL for the user's profile picture (mocked for demo)
  const rProfileUrl = "https://avatar.iran.liara.run/public/98";

  // Function to get the latest assessment from an array of assessments
  // This function compares the start_date_time of each assessment and returns the one with the latest date
  const getLatestAssessment = (
    assessments: Assessment[]
  ): Assessment | undefined => {
    return assessments.reduce((latest, current) => {
      const latestDate = new Date(latest.start_date_time).getTime();
      const currentDate = new Date(current.start_date_time).getTime();
      return currentDate > latestDate ? current : latest;
    }, assessments[0]);
  };

  const [allAssessments, setAllAssessments] = useState<Assessment[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [latestAssessment, setLatestAssessment] = useState<Assessment>();
  const [user, setUser] = useState<User>();

  // Function to format a date to YYYY-MM-DD format
  const formatToYMD = (date: string | number | Date): string => {
    const d = new Date(typeof date === "string" ? parseInt(date) : date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    const day = d.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Fetch user assessments and user data when the component mounts
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
          // Add new assessments to the allAssessments state if they don't already exist
          setAllAssessments((prev) => {
            const exists = prev.some((a) => a.id === assessment.id);
            if (!exists) {
              return [...prev, assessment];
            }
            return prev;
          });

          // Add completed assessments to the assessments state
          setAssessments((prev) => {
            const exists = prev.some((a) => a.id === assessment.id);
            if (!exists && assessment.end_date_time != null) {
              return [...prev, assessment];
            }
            return prev;
          });
        });

        // Set the latest assessment from the fetched assessments
        setLatestAssessment(getLatestAssessment(assessments));
      } catch (e) {
        console.log(e);
      }
    }

    // Fetch user profile data
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
          alert("Error getting assessments");
        }

        setUser(result.data.getUser);
        localStorage.setItem("userId", user!.user_id.toString());
      } catch (e) {
        console.log(e);
      }
    }
    getUser();
    getUserAssessments();
  }, []);

  // Function to handle starting a new assessment
  async function handleAssessment() {
    try {
      console.log(process.env.REACT_APP_GRAPHQL_URL);
      const res = await fetch(process.env.REACT_APP_GRAPHQL_URL || "", {
        method: "POST",
        credentials: "include",
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
        localStorage.setItem("assessmentId", data.data.addAssessment.id);
        navigate("/introduction/financial-health");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="p-6 mb-[70px]">
      {/* Welcome component displaying user's profile picture and name */}
      <WelcomeBack
        profileUrl={rProfileUrl}
        name={user != null ? user?.first_name + " " + user?.last_name : ""}
      ></WelcomeBack>

      {/* Reminder component to remind the user to start the assessment if it's been too long */}
      <ReminderComponent
        onStartAssessment={() => handleAssessment()}
        lastAssessmentDate={formatToYMD(latestAssessment?.end_date_time ?? "")}
      ></ReminderComponent>

      {/* Progress chart displaying the user's assessment progress */}
      <ProgressChart assessments={assessments} />
      <button
        onClick={handleAssessment}
        className="w-full px-4 py-3 mt-8 mb-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
      >
        Start a New Assessment
      </button>

      {/* Ongoing assessments */}
      <OngoingAssessments
        assessments={allAssessments.filter(
          (a) => a.end_date_time === null || a.end_date_time === undefined
        )}
      />

      {/* Previous assessments */}
      <PreviousAssessment assessments={assessments} />
    </div>
  );
};

export default Home;
