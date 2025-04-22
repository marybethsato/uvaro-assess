import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BaseButton from "../components/buttons/BaseButton";
import Layout from "../components/Layout";
import TopNavBar from "../components/navigation/TopNavBar";
import ResultCard from "../components/result/ResultCard";
import levelMap from "../data/level_map";
import { GET_ASSESSMENT_BY_ID } from "../graphql/queries";
import getCategoryKeyByIndex from "../utils/get_category_key_by_index";

interface Level {
  categoryId: number;
  levelName: string;
  levelStatement: string;
}

const Result = () => {
  const navigate = useNavigate();
  const [levels, setLevels] = useState<Level[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") !== null);
    getResults();
  }, []);

  function getResults() {
    if (isLoggedIn) {
      getResultsForAuthenticated();
    } else {
      getResultsForGuests();
    }
  }

  async function signIn() {
    try {
      localStorage.setItem("saveAssessment", "true");

      const loginPath = "/login";
      const baseUrl = window.location.origin;
      const redirectPath = baseUrl + "/app/home";
      const url =
        process.env.REACT_APP_BACKEND_URL +
        loginPath +
        "?referer=" +
        redirectPath;

      const res = await fetch(url, {
        method: "GET",
        credentials: "include",
        redirect: "manual",
      });

      window.location.href = res.url;
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  }

  function getResultsForGuests() {
    const categoryIndexes = [1, 2, 3, 4];
    const guestLevels: Level[] = [];

    categoryIndexes.forEach((index) => {
      const stored = localStorage.getItem(index.toString() + "_result");
      if (stored) {
        const parsed = JSON.parse(stored);
        const level = parsed?.data?.calculateLevel;
        if (level) {
          guestLevels.push(level);
        }
      }
    });
    setLevels(guestLevels);

    if (guestLevels.length === 0) {
      navigate("/");
    }
  }

  const getResultsForAuthenticated = async () => {
    const assessmentId = localStorage.getItem("assessmentId");
    try {
      const response = await fetch(process.env.REACT_APP_GRAPHQL_URL || "", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: GET_ASSESSMENT_BY_ID,
          variables: {
            getAssessmentByIdId: Number(assessmentId),
          },
        }),
      });

      const result = await response.json();
      console.log("Mutation Result:", result);
      if (!result.errors) {
        setLevels(result.data.getAssessmentById.levels);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Layout>
      <div className="ml-5 mb-2 mt-8">
        <TopNavBar />
      </div>
      <div className="mx-10 lg:space-y-5 md:w-4/5 md:mx-auto">
        {/* Title and description for the results page */}
        <h1 className="text-3xl font-bold text-center mt-2 mb-3">
          Your Career Assessment Results
        </h1>
        <p className="text-center lg:text-lg">
          Your results highlight your strengths and growth areas. Let’s turn
          these insights into your roadmap for success.
        </p>

        {/* Display the assessment levels using ResultCard component */}
        <div className="">
          {levels.map((level, index) => (
            <ResultCard
              key={index}
              category_key={getCategoryKeyByIndex(index) ?? ""}
              levelName={"Level " + levelMap[level.levelName]}
              levelStatement={level.levelStatement}
            />
          ))}
          <div className="md:mt-3">
            {/* Button to open Uvaro website */}
            <BaseButton
              className="mt-6 green-button"
              onClick={() => window.open("https://uvaro.com", "_blank")}
            >
              Book Appointment with Advisor
            </BaseButton>

            {/* Conditional rendering based on whether the user is logged in */}
            {!isLoggedIn ? (
              <div>
                <BaseButton
                  className="mt-3 w-full white-button"
                  onClick={() => signIn()}
                >
                  Sign in to Save Assessment
                </BaseButton>
                <p className="text-center text-sm my-5 mb-10">
                  Don't have an account?{" "}
                  <Link to="/signup" onClick={signIn} className="text-button">
                    Sign up now!
                  </Link>
                </p>
              </div>
            ) : (
              // Button to navigate back to the home page if the user is logged in
              <BaseButton
                className="mt-3 w-full white-button mb-10"
                onClick={() => navigate("/app/home")}
              >
                Back to Home
              </BaseButton>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Result;
