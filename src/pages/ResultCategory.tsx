import ResultCard from "../components/result/ResultCard";
import BaseButton from "../components/buttons/BaseButton";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import resultcategory from "../images/result/result-category.png";
import { FaArrowLeft } from "react-icons/fa";
const ResultCategory = () => {
  const categoryMap: Record<string, string> = {
    "financial-health": "Financial Health",
    "work-you-enjoy": "Work You Enjoy",
    "life-choice-fulfillment": "Life Choice Fulfillment",
    "peer-community-fulfillment": "Peer Community Fulfillment",
  };

  const navigate = useNavigate();
  const isCompletedFullAssessment = true;
  const { category } = useParams<{ category: string }>();
  const categoryName = getCategoryName(category || "default");
  const categoryLevel = getCategoryLevel(category || "default");
  const categoryDescription = getCategoryDescription(category || "default");

  function getCategoryName(key: string): string {
    return categoryMap[key] || "Unknown Category";
  }

  function getCategoryLevel(key: string): string {
    return "Level 1";
  }

  function getCategoryDescription(key: string): string {
    return "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.";
  }

  return (
    <Layout>
      <div className="mx-5 my-5">
        {isCompletedFullAssessment ? (
          <button
            className="hover:bg-gray-700 p-2 rounded"
            onClick={() => navigate("/result")}
          >
            <FaArrowLeft />
          </button>
        ) : null}

        <div className="mx-5 my-5">
          <div className="flex justify-center mt-10">
            <img
              className="w-auto h-auto"
              src={resultcategory}
              alt="completed-category"
            />
          </div>
          <h1 className="text-3xl font-bold text-center mt-10 ">
            {categoryName}
          </h1>
          <h1 className="text-2xl font-bold text-center ">{categoryLevel}</h1>
          <p className="text-center mt-4">{categoryDescription}</p>
          {!isCompletedFullAssessment ? (
            <div>
              <div className="flex justify-center">
                <BaseButton
                  className="mt-5 bg-green-custom text-white font-bold w-full hover:bg-gray-700"
                  onClick={() => navigate("/signin")}
                >
                  Complete This Category
                </BaseButton>
              </div>

              <div className="flex justify-center">
                <BaseButton
                  className="mt-5 bg-green-custom text-white font-bold w-full hover:bg-gray-700"
                  onClick={() => navigate("/signin")}
                >
                  Ask Follow-Up Questions
                </BaseButton>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </Layout>
  );
};

export default ResultCategory;
