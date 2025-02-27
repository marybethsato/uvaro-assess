import { FaArrowLeft } from "react-icons/fa";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { useEffect, useState } from "react";
import BaseButton from "../components/buttons/BaseButton";
import Layout from "../components/Layout";
import categoryMap from "../data/category_map";
import { CALCULATE_LEVEL, INSERT_NOTES } from "../graphql/queries";
import resultcategory from "../images/result/result-category.png";
import getCategoryIndexByKey from "../utils/get_category_index_by_key";
import getCategoryKeyByIndex from "../utils/get_category_key_by_index";
import NotesModal from "./NodesModal";



const ResultCategory = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isCompletedFullAssessment = searchParams.get("is_completed_full_assessment") === "false" ? false : true;

  const { category } = useParams<{ category: string }>();
  const categoryName = getCategoryName(category || "default");
  const [categoryLevel, setCategoryLevel] = useState<string>('');
  const [categoryDescription, setCategoryDescription] = useState<string>('');
  const assessmentId = localStorage.getItem("assessmentId");

  useEffect(() => {
    calculateLevel();
  }, []);

  const calculateLevel = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_GRAPHQL_URL || "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: CALCULATE_LEVEL,
          variables: {
            assessmentId: Number(assessmentId),
            categoryId: (getCategoryIndexByKey(category!) + 1)
          },
        }),
      });

      const result = await response.json();
      console.log("Mutation Result:", result);

      if (!result.errors) {
        setCategoryLevel(result.data.calculateLevel.level_name);
        setCategoryDescription(result.data.calculateLevel.level_statement.toString());
      }

    } catch (e) {

    }
  };

  function getCategoryName(key: string): string {
    return categoryMap[key] || "Unknown Category";
  }

  const getCategoryLevel = (): string => {
    return categoryLevel;
  };

  function navigateToNextCategory() {

    setIsModalOpen(true);

    // const categoryKey = getCategoryKeyByIndex(getCategoryIndexByKey(category!) + 1);
    // console.log(categoryKey);
    // navigate("/introduction/" + categoryKey);
  }

  function navigateToFollowUpQuestions() {
    const categoryKey = getCategoryKeyByIndex(getCategoryIndexByKey(category!));
    navigate("/assessment?" + "is_follow_up=true&category=" + categoryKey);
  }


  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSave = async (note: string) => {
    const isSubmittedNotes = await submitNotes(note);
    if (isSubmittedNotes) {
      const categoryKey = getCategoryKeyByIndex(getCategoryIndexByKey(category!) + 1);

      if (getCategoryIndexByKey(categoryKey!) == -1) {
        navigate("/complete-checkmark");
      } else {
        navigate("/introduction/" + categoryKey);
      }
    } else {
      alert("Error submitting notes. Please try again later.");
    }
  };


  const submitNotes = async (note: string) => {
    try {

      const response = await fetch(process.env.REACT_APP_GRAPHQL_URL || "", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: INSERT_NOTES,
          variables: {
            insertNoteAssessmentId2: Number(assessmentId),
            insertNoteCategoryId2: getCategoryIndexByKey(category!) + 1,
            noteText: note
          },
        }),
      });

      const result = await response.json();
      console.log("Mutation Result:", result);
      return true;
    } catch (e) {
      return false;
    }
  };

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
          <h1 className="text-2xl font-bold text-center ">{getCategoryLevel()}</h1>
          <p className="text-center mt-4">{categoryDescription}</p>
          {!isCompletedFullAssessment ? (
            <div>
              <div className="flex justify-center">
                <BaseButton
                  className="mt-5 bg-green-custom text-white font-bold w-full hover:bg-gray-700"
                  onClick={() => navigateToNextCategory()}
                >
                  Complete This Category
                </BaseButton>
              </div>

              <div className="flex justify-center">
                <BaseButton
                  className="mt-5 bg-green-custom text-white font-bold w-full hover:bg-gray-700"
                  onClick={() => navigateToFollowUpQuestions()}
                >
                  Ask Follow-Up Questions
                </BaseButton>
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <NotesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </Layout>
  );
};

export default ResultCategory;
