import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BaseButton from "../components/buttons/BaseButton";
import Layout from "../components/Layout";
import ResultCard from "../components/result/ResultCard";
import { GET_ASSESSMENT_BY_ID } from "../graphql/queries";
import getCategoryKeyByIndex from "../utils/get_category_key_by_index";

interface Level {
  category_id: number;
  level_name: string;
  level_statement: string;
}

const Result = () => {
  const navigate = useNavigate();
  const [levels, setLevels] = useState<Level[]>([]);

  useEffect(() => {
    getResults();
  }, []);

  const getResults = async () => {
    const assessmentId = localStorage.getItem("assessmentId");
    try {
      const response = await fetch(process.env.REACT_APP_GRAPHQL_URL || "", {
        method: "POST",
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
      <div className="mx-10">
        <h1 className="text-3xl font-bold text-center mt-10 mb-3">
          Your Career Assessment Results
        </h1>
        <p className="text-center">
          Your results highlight your strengths and growth areas. Let’s turn
          these insights into your roadmap for success.
        </p>
        {levels.map((level, index) => (
          <ResultCard
            key={index}
            category_key={getCategoryKeyByIndex(index) ?? ""}
            level_name={level.level_name}
            level_statement={level.level_statement}
            style={
              index % 2 === 0
                ? { backgroundColor: "#449b44", color: "white" }
                : {}
            }
          />
        ))}

        <BaseButton
          className="mt-5 green-button"
          onClick={() => navigate("/signin")}
        >
          Book Appointment with Advisor
        </BaseButton>
        <BaseButton
          className="mt-3 w-full white-button"
          onClick={() => navigate("/signin")}
        >
          Sign in to Save Assessment
        </BaseButton>

        <p className="text-center text-sm my-5 mb-10">
          Don't have an account?{" "}
          <Link to="/signup" className="text-button">
            Sign up now!
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default Result;
