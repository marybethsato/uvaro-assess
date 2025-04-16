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
  CALCULATE_LEVEL_AUTHENTICATED,
  END_ASSESSSMENT,
  GET_USER,
  GET_USER_ASSESSMENTS,
} from "../graphql/queries";
import Assessment from "../interfaces/assessment";
import User from "../interfaces/user";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const rProfileUrl = "https://avatar.iran.liara.run/public/98";

  const [allAssessments, setAllAssessments] = useState<Assessment[]>([]);
  const [assessments, setAssessments] = useState<Assessment[]>([]);
  const [latestAssessment, setLatestAssessment] = useState<Assessment>();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState<boolean>(true);

  const getLatestAssessment = (
    assessments: Assessment[]
  ): Assessment | undefined => {
    return assessments.reduce((latest, current) => {
      const latestDate = new Date(latest.startDateTime).getTime();
      const currentDate = new Date(current.startDateTime).getTime();
      return currentDate > latestDate ? current : latest;
    }, assessments[0]);
  };

  const formatToYMD = (date: string | number | Date): string => {
    const d = new Date(typeof date === "string" ? parseInt(date) : date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    async function init() {
      try {
        await getUser();
        await saveAssessment();
        await getUserAssessments();

        localStorage.removeItem("assessmentId");
        localStorage.removeItem("saveAssessment");
      } catch (error) {
        console.error("Error during initialization:", error);
      } finally {
        setLoading(false);
      }
    }
    init();
  }, []);

  async function getUserAssessments() {
    try {
      const response = await fetch(process.env.REACT_APP_GRAPHQL_URL || "", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: GET_USER_ASSESSMENTS }),
      });

      const result = await response.json();
      if (!response.ok) {
        alert("Error getting assessments");
        return;
      }

      const fetchedAssessments: Assessment[] = result.data.getUserAssessments;
      const completed = fetchedAssessments.filter((a) => a.endDateTime != null);
      setAllAssessments(fetchedAssessments);
      setAssessments(completed);
      if (completed.length > 0) {
        setLatestAssessment(getLatestAssessment(completed));
      }
    } catch (e) {
      console.log(e);
    }
  }

  async function getUser() {
    try {
      const response = await fetch(process.env.REACT_APP_GRAPHQL_URL || "", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: GET_USER }),
      });

      const result = await response.json();
      if (!response.ok) {
        alert("Error getting user");
      }
      setUser(result.data.getUser);
      localStorage.setItem("isLoggedIn", "true");
    } catch (e) {
      console.log(e);
    }
  }

  async function saveAssessment() {
    const isSave = localStorage.getItem("saveAssessment") !== null;
    if (!isSave) return;

    await startAssessment();

    for (let i = 1; i <= 4; i++) {
      await saveAssessmentByCategory(i);
    }

    await endAssessment();
  }

  async function startAssessment() {
    try {
      const res = await fetch(process.env.REACT_APP_GRAPHQL_URL || "", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: ADD_ASSESSMENT }),
      });

      const data = await res.json();
      if (!data.errors) {
        localStorage.setItem(
          "assessmentId",
          data.data.addAssessment.assessmentId
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function saveAssessmentByCategory(index: number) {
    try {
      const stored = localStorage.getItem(index.toString());
      const answersList = stored ? JSON.parse(stored) : [];
      const answersMap = answersList.map((ans: any) => ({ answerId: ans }));
      const assessmentId = localStorage.getItem("assessmentId");

      await fetch(process.env.REACT_APP_GRAPHQL_URL || "", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: CALCULATE_LEVEL_AUTHENTICATED,
          variables: {
            categoryId: index,
            assessmentId: parseInt(assessmentId!),
            answers: answersMap,
          },
        }),
      });
    } catch (e) {
      console.log("Error saving assessment by category");
    }
  }

  async function endAssessment() {
    try {
      await fetch(process.env.REACT_APP_GRAPHQL_URL || "", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: END_ASSESSSMENT,
          variables: {
            assessmentId: Number(localStorage.getItem("assessmentId")),
          },
        }),
      });
    } catch (error) {
      console.error("Error ending assessment:", error);
    }
  }

  async function handleAssessment() {
    try {
      const res = await fetch(process.env.REACT_APP_GRAPHQL_URL || "", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: ADD_ASSESSMENT }),
      });

      const data = await res.json();
      if (!data.errors) {
        localStorage.setItem(
          "assessmentId",
          data.data.addAssessment.assessmentId
        );
        navigate("/introduction/financial-health");
      } else {
        alert("Failed to start assessment: " + data.errors[0].message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-2xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="p-6 mb-[70px]">
      <WelcomeBack
        profileUrl={rProfileUrl}
        name={user ? `${user.firstName} ${user.lastName}` : ""}
      />

      {loading === false && assessments.length === 0 ? (
        <p className="mt-20 text-center text-3xl font-semibold my-8">
          You have not taken the assessment yet!
          <br />
          Wanna try?
        </p>
      ) : (
        <>
          <ReminderComponent
            onStartAssessment={handleAssessment}
            lastAssessmentDate={formatToYMD(
              latestAssessment?.endDateTime ?? ""
            )}
          />
          <ProgressChart assessments={assessments} />
        </>
      )}

      <button
        onClick={handleAssessment}
        className="w-full px-4 py-3 mt-8 mb-4 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition"
      >
        Start a New Assessment
      </button>

      <OngoingAssessments
        assessments={allAssessments.filter((a) => !a.endDateTime)}
      />
      <PreviousAssessment assessments={assessments} />
    </div>
  );
};

export default Home;
