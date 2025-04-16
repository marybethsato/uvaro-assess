import { useEffect, useState } from "react";
import Layout from "../components/Layout";

import AnswerList from "../components/assessment/AnswerList";
import Header from "../components/assessment/Header";
import QuestionCard from "../components/assessment/QuestionCard";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProgressBar from "../components/assessment/ProgressBar";
import categoryMap from "../data/category_map";
import { ALL_CATEGORIES } from "../graphql/queries";
import Answer from "../interfaces/answer";
import getCategoryIndexByKey from "../utils/get_category_index_by_key";
import getCategoryKeyByValue from "../utils/get_category_key_by_value";

interface Question {
  questionId: number;
  questionText: string;
  answers: Answer[];
  followUp: boolean;
}

interface Category {
  categoryId: number;
  categoryName: string;
  questions: Question[];
}

interface SelectedAnswer {
  questionId: number;
  answer: Answer;
}

interface Note {
  questionId: number;
  content: string;
}

const Assessment = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "financial-health";
  const isFollowUp = searchParams.get("is_follow_up") === "true" ? true : false;

  const navigate = useNavigate();

  const addQuestion = (newQuestion: Question) => {
    setQuestions((prevQuestions) => {
      const exists = prevQuestions.some(
        (q) => q.questionId === newQuestion.questionId
      );

      if (exists) {
        return prevQuestions.map((q) =>
          q.questionId === newQuestion.questionId
            ? { ...q, ...newQuestion }
            : q
        );
      } else {
        return [...prevQuestions, newQuestion];
      }
    });
  };

  useEffect(() => {
    console.log(isFollowUp)
    setQuestions([]);

    async function fetchCategories() {
      try {
        const res = await fetch(process.env.REACT_APP_GRAPHQL_URL || "", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: ALL_CATEGORIES,
          }),
        });

        if (!res.ok) {
          console.log('here');
          throw new Error("Failed to fetch categories");
        }

        const response = await res.json();
        console.log(response.data);

        if (response.errors) {
          console.log('error here');
          throw new Error(
            `GraphQL error: ${response.errors[0].message || "Unknown error"}`
          );
        }

        const data = response.data;

        if (data && data.allCategories) {
          setCategories(data.allCategories);
          if (data.allCategories.length > 0) {
            const categoryIndex = getCategoryIndexByKey(category);
            data.allCategories[categoryIndex].questions.forEach(
              (question: Question) => {
                if (isFollowUp && question.followUp == true) {

                  addQuestion(question);

                } else if (isFollowUp == false && question.followUp == false) {

                  addQuestion(question);
                }
              }
            );
          } else {
            setCategories([]);
            setQuestions([]);

          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);



  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectAnswer = (answer: Answer) => {
    setSelectedAnswers((prev) => {
      const existing = prev.find(
        (a) => a.questionId === currentQuestion.questionId
      );
      if (existing) {
        return prev.map((a) =>
          a.questionId === currentQuestion.questionId ? { ...a, answer } : a
        );
      } else {
        return [...prev, { questionId: currentQuestion.questionId, answer }];
      }
    });
  };

  const handleNext = async () => {
    if (
      !selectedAnswers.find(
        (item) => item.questionId === currentQuestion.questionId
      )
    ) {
      alert("Please select an answer.");
      return;
    }

    const selectedAnswer = selectedAnswers.find(
      (item) => item.questionId === currentQuestion.questionId
    )!.answer;

    saveAnswerToLocal(
      selectedAnswer.answerId
    );
    
    // next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
    else {
      const currentCategoryKey = getCategoryKeyByValue(
        currentCategory!.categoryName
      );
      navigate(
        "/result/" + currentCategoryKey + "?is_completed_full_assessment=false"
      );
    }
  };

  const handleBack = async () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      navigate(-1);
    }
  };

  const currentCategory = categories.find(function (_category) {
    return isFollowUp ? _category.categoryName === categoryMap[category] :
      (_category.questions.some(
        (q) => q.questionId === currentQuestion.questionId
      ));
  }
  );
  const totalQuestions = questions.length;
  const currentNumber = currentQuestionIndex + 1;

  if (loading) {
    return (
      <Layout>
        <Header />
        <div className="mx-5 flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      </Layout>
    );
  }

  const saveAnswerToLocal = async (answerId: number) => {
    try {
      const categoryId = currentCategory!.categoryId.toString();
      const storedAnswers = localStorage.getItem(categoryId);
      const currentAnswers = storedAnswers ? JSON.parse(storedAnswers) : [];

      currentAnswers.push(answerId);

      localStorage.setItem(categoryId, JSON.stringify(currentAnswers));
    } catch (e) {
      console.log(e);
    }
  };


  if (!currentQuestion) {
    return <p>Error...</p>;
  }

  return (
    <Layout>
      <Header title="Assessment" />
      <ProgressBar
        activeCategoryIndex={categories.findIndex(
          (c) => c.categoryName === currentCategory?.categoryName
        )}
        categories={categories.map((c) => ({
          name: c.categoryName,
          totalQuestions: c.questions.length,
          answered: selectedAnswers.filter((a) =>
            c.questions.some((q) => q.questionId === a.questionId)
          ).length,
        }))}
      />
      <div className="mx-5 flex flex-col">
        <QuestionCard
          number={currentNumber}
          total={totalQuestions}
          category={
            currentCategory ? currentCategory.categoryName : "Uncategorized"
          }
          question={currentQuestion.questionText}
        />
        <AnswerList
          options={currentQuestion.answers}
          selected={
            selectedAnswers.find(
              (a) => a.questionId === currentQuestion.questionId
            )?.answer ?? null
          }
          onSelect={(answer) => handleSelectAnswer(answer)}
        />
        {/* <NoteCard
          questionId={currentQuestion.questionId}
          onNoteChange={handleNoteChange}
          existingNote={
            notes.find((n) => n.questionId === currentQuestion.questionId)
              ?.content
          }
        /> */}
        <div
          className={`flex flex-row ${currentQuestionIndex > 0 ? "justify-between" : "justify-end"
            }`}
        >
          {currentQuestionIndex > 0 && (
            <button
              className="mt-10 px-4 py-2 border border-gray-300 hover:bg-gray-100 self-end rounded-md cursor-pointer flex items-center gap-3"
              onClick={handleBack}
            >
              <FaArrowLeft />
              <span>Back</span>
            </button>
          )}
          <button
            className="mt-10 px-4 py-2 border border-gray-300 hover:bg-gray-100 self-end rounded-md cursor-pointer flex items-center gap-3"
            onClick={handleNext}
          >
            <span>Next</span>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Assessment;
function getKeyByValue(arg0: string) {
  throw new Error("Function not implemented.");
}
