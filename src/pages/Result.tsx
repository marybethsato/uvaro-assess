import ResultCard from "../components/result/ResultCard";
import BaseButton from "../components/buttons/BaseButton";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

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
        <ResultCard isGreen={true} category="Financial Health" />
        {/* <ResultCard isGreen={true} category={category} level={level} description={description}/> */}
        <ResultCard isGreen={false} category="Work You Enjoy" />
        <ResultCard isGreen={true} category="Life CHoice Fulfillment" />
        <ResultCard isGreen={false} category="Peer Community Fulfillment" />
        <div className="mb-10 space-y-5">
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
