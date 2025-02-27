import { Link, useNavigate } from "react-router-dom";
import BaseButton from "../components/buttons/BaseButton";
import Layout from "../components/Layout";
import ResultCard from "../components/result/ResultCard";

const Result = () => {
  const navigate = useNavigate();

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
        <ResultCard onClick={() => navigate("/result/financial-health")} />
        <ResultCard onClick={() => navigate("/result/work-you-enjoy")} />
        <ResultCard
          onClick={() => navigate("/result/life-choice-fulfillment")}
        />
        <ResultCard
          onClick={() => navigate("/result/peer-community-fulfillment")}
        />
        <div className="flex justify-center">
          <BaseButton
            className="mt-5 bg-black text-white w-full hover:bg-gray-700"
            onClick={() => navigate("/signin")}
          >
            Sign in to Save Assessment
          </BaseButton>
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-red-500 font-semibold">
              Sign up now!
            </Link>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Result;
