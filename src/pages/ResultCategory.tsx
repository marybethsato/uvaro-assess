import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { useEffect, useState } from "react";
import BaseButton from "../components/buttons/BaseButton";
import Layout from "../components/Layout";
import TopNavBar from "../components/navigation/TopNavBar";
import categoryMap from "../data/category_map";
import {
  CALCULATE_LEVEL_AUTHENTICATED,
  CALCULATE_LEVEL_GUEST,
  INSERT_NOTES,
} from "../graphql/queries";
import "../styles/globals.css";
import getCategoryIndexByKey from "../utils/get_category_index_by_key";
import getCategoryKeyByIndex from "../utils/get_category_key_by_index";
import NotesModal from "./NodesModal";

const ResultCategory = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isCompletedFullAssessment =
    searchParams.get("is_completed_full_assessment") === "false" ? false : true;

  const isFollowUpDone =
    searchParams.get("is_follow_up_done") === "true" ? true : false;

  const { category } = useParams<{ category: string }>();
  const categoryName = getCategoryName(category || "default");
  const [categoryLevel, setCategoryLevel] = useState<string>("");
  const [categoryDescription, setCategoryDescription] = useState<string>("");
  const [levelImage, setLevelImage] = useState<string>("");
  const assessmentId = localStorage.getItem("assessmentId");

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") !== null;
    setIsLoggedIn(isLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn !== null) {
      calculateLevel();
    }
  }, [isLoggedIn]);

  function calculateLevel() {
    if (isLoggedIn) {
      calculateLevelAuthenticated();
    } else {
      calculateLevelGuests();
    }
  }

  const calculateLevelGuests = async () => {
    try {
      const categoryIndex = getCategoryIndexByKey(category!) + 1;
      const stored = localStorage.getItem(categoryIndex.toString());
      const answersList = stored ? JSON.parse(stored) : [];
      const answersMap: any[] = [];

      answersList.forEach((element: any) => {
        answersMap.push({
          answerId: element,
        });
      });

      const response = await fetch(process.env.REACT_APP_GRAPHQL_URL || "", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: CALCULATE_LEVEL_GUEST,
          variables: {
            answers: answersMap,
            categoryId: categoryIndex,
          },
        }),
      });

      const result = await response.json();
      setLevelImage(result.data.calculateLevel.levelImage);

      if (!result.errors) {
        setCategoryLevel(result.data.calculateLevel.levelName);
        setCategoryDescription(
          result.data.calculateLevel.levelStatement.toString()
        );

        localStorage.setItem(
          categoryIndex.toString() + "_result",
          JSON.stringify(result)
        );
      }
    } catch (e) {
      console.log("error" + e);
    }
  };

  const calculateLevelAuthenticated = async () => {
    try {
      console.log("CALCULATE AUTH");

      const categoryIndex = getCategoryIndexByKey(category!) + 1;
      const stored = localStorage.getItem(categoryIndex.toString());
      const answersList = stored ? JSON.parse(stored) : [];
      const answersMap: any[] = [];

      answersList.forEach((element: any) => {
        answersMap.push({
          answerId: element,
        });
      });

      const response = await fetch(process.env.REACT_APP_GRAPHQL_URL || "", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: CALCULATE_LEVEL_AUTHENTICATED,
          variables: {
            categoryId: parseInt(categoryIndex.toString()),
            assessmentId: parseInt(assessmentId!),
            answers: answersMap,
          },
        }),
      });

      const result = await response.json();
      setLevelImage(result.data.calculateLevel.levelImage);

      if (!result.errors) {
        setCategoryLevel(result.data.completeCategory.levelName);
        setCategoryDescription(
          result.data.completeCategory.levelStatement.toString()
        );
      }
    } catch (e) {}
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
      const categoryKey = getCategoryKeyByIndex(
        getCategoryIndexByKey(category!) + 1
      );

      if (getCategoryIndexByKey(categoryKey!) === -1) {
        navigate("/complete-checkmark");
      } else {
        navigate("/introduction/" + categoryKey);
      }
    } else {
      alert("Error submitting notes. Please try again later.");
    }
  };

  const handleSkip = () => {
    const categoryKey = getCategoryKeyByIndex(
      getCategoryIndexByKey(category!) + 1
    );

    if (getCategoryIndexByKey(categoryKey!) === -1) {
      navigate("/complete-checkmark");
    } else {
      navigate("/introduction/" + categoryKey);
    }
  };

  const submitNotes = async (note: string) => {
    try {
      const response = await fetch(process.env.REACT_APP_GRAPHQL_URL || "", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: INSERT_NOTES,
          variables: {
            insertNoteAssessmentId2: Number(assessmentId),
            insertNoteCategoryId2: getCategoryIndexByKey(category!) + 1,
            noteText: note,
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
      <div className="mx-5 my-5 flex flex-col">
        {isCompletedFullAssessment ? <TopNavBar /> : null}

        <div className="mx-5 my-5">
          <div className="flex justify-center mt-10">
            <img
              className="w-auto h-auto"
              src={levelImage}
              alt="completed-category"
            />
          </div>
          <h1>{levelImage}</h1>
          <h1 className="text-3xl font-bold text-center mt-10 ">
            {categoryName}
          </h1>
          <h1 className="text-2xl font-bold text-center ">
            {getCategoryLevel()}
          </h1>
          <p className="text-center mt-4">{categoryDescription}</p>
          {!isCompletedFullAssessment && !isFollowUpDone ? (
            <div>
              <p className="text-center font-bold mt-10 text-xl">
                Does this represent you?
              </p>
              <div className="flex justify-center">
                <BaseButton
                  className="mt-5 green-button font-bold"
                  onClick={() => navigateToNextCategory()}
                >
                  This Represents Me
                </BaseButton>
              </div>

              <div className="flex justify-center">
                <BaseButton
                  className="mt-5 font-bold white-button"
                  onClick={() => navigateToFollowUpQuestions()}
                >
                  Not quite. Ask more Questions.
                </BaseButton>
              </div>
            </div>
          ) : isFollowUpDone ? (
            <div className="flex justify-center">
              <BaseButton
                className="mt-5 green-button font-bold"
                onClick={() => navigateToNextCategory()}
              >
                Finish Category
              </BaseButton>
            </div>
          ) : null}
        </div>
      </div>
      <NotesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        onSkip={handleSkip}
      />
    </Layout>
  );
};

export default ResultCategory;
