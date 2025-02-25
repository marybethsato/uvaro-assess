import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import IntroBackground from "../images/IntroBackground.png";
import IntroVector from "../images/IntroVector.png";
import BaseButton from "../components/buttons/BaseButton";
import { FaArrowLeft } from "react-icons/fa";

interface RouteParams {
  category: string;
  [key: string]: string | undefined;
}

const categoryMap: Record<string, string> = {
  "financial-health": "Financial Health",
  "work-you-enjoy": "Work You Enjoy",
  "life-choice-fulfillment": "Life Choice Fulfillment",
  "peer-community-fulfillment": "Peer Community Fulfillment",
};

const CategoryIntroduction = () => {
  const navigate = useNavigate();

  const { category } = useParams<RouteParams>();

  if (!category) {
    return null;
  }

  const categoryName = categoryMap[category] || "Unknown Category";

  return (
    <Layout>
      <div className="mx-auto overflow-hidden">
        <div className="absolute w-full ">
          <div className="bg-[#181819]">
            <button
              className="hover:bg-gray-700 rounded text-white p-2 ml-2 mt-2"
              onClick={() => navigate("/")}
            >
              <FaArrowLeft />
            </button>
          </div>
          <img
            src={IntroBackground}
            alt="illustration"
            className="w-full mx-auto"
          />
        </div>
        <div className="text-left mb-10 mt-[50vh] mx-5">
          <h3 className="text-xl mb-2">Introduction</h3>
          <h1 className="text-3xl font-bold">What is</h1>
          <h1 className="text-3xl font-bold">{categoryName}?</h1>
          <img src={IntroVector} alt="vector" className="mt-5" />
          <p className=" mt-5">
            This assessment will help you to understand the basics of the
            category you choose. You will be asked a series of questions and you
            will have to select the correct answer from the options provided.
          </p>
        </div>
        <div className="flex justify-center">
          <BaseButton
            className="w-2/3 bg-primary text-white hover:bg-red-700"
            onClick={() => navigate("/assessment")}
          >
            Continue
          </BaseButton>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryIntroduction;
