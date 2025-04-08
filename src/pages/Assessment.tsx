import { useEffect, useState } from "react";
import Layout from "../components/Layout";

import AnswerList from "../components/assessment/AnswerList";
import Header from "../components/assessment/Header";
import QuestionCard from "../components/assessment/QuestionCard";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProgressBar from "../components/assessment/ProgressBar";
import { ALL_CATEGORIES, INSERT_ANSWER } from "../graphql/queries";
import Answer from "../interfaces/answer";
import getCategoryIndexByKey from "../utils/get_category_index_by_key";
import getCategoryKeyByValue from "../utils/get_category_key_by_value";

interface Question {
  question_id: number;
  question_text: string;
  answers: Answer[];
  follow_up: boolean;
}

interface Category {
  category_id: number;
  category_name: string;
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

  const [notes, setNotes] = useState<Note[]>([]);

  const addQuestion = (newQuestion: Question) => {
    setQuestions((prevQuestions) => {
      const exists = prevQuestions.some(
        (q) => q.question_id === newQuestion.question_id
      );

      if (exists) {
        return prevQuestions.map((q) =>
          q.question_id === newQuestion.question_id
            ? { ...q, ...newQuestion }
            : q
        );
      } else {
        return [...prevQuestions, newQuestion];
      }
    });
  };

  useEffect(() => {
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
          throw new Error("Failed to fetch categories");
        }

        const response = await res.json();
        console.log(response.data);

        if (response.errors) {
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
                if (isFollowUp && question.follow_up === true) {
                  console.log("here");
                  addQuestion(question);
                } else if (
                  isFollowUp === false &&
                  question.follow_up === false
                ) {
                  console.log("hi");
                  addQuestion(question);
                }
              }
            );
          } else {
            setCategories([]);
            setQuestions([]);
            console.log("No categories found.");
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
        (a) => a.questionId === currentQuestion.question_id
      );
      if (existing) {
        return prev.map((a) =>
          a.questionId === currentQuestion.question_id ? { ...a, answer } : a
        );
      } else {
        return [...prev, { questionId: currentQuestion.question_id, answer }];
      }
    });
  };

  const handleNext = async () => {
    if (
      !selectedAnswers.find(
        (item) => item.questionId === currentQuestion.question_id
      )
    ) {
      alert("Please select an answer.");
      return;
    }

    const selectedAnswer = selectedAnswers.find(
      (item) => item.questionId === currentQuestion.question_id
    )!.answer;

    const isSubmitted = await submitAnswer(
      currentQuestion.question_id,
      selectedAnswer.answer_id
    );
    if (isSubmitted == false) {
      alert("Error. Answer not submitted");
      return;
    }
    // next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);

      //console.log("Note:", notes);
    }
    // initial results category
    else {
      const currentCategoryKey = getCategoryKeyByValue(
        currentCategory!.category_name
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

  const currentCategory = categories.find((_category) =>
    _category.questions.some(
      (q) => q.question_id === currentQuestion.question_id
    )
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

  const assessmentId = localStorage.getItem("assessmentId");

  const submitAnswer = async (questionId: number, answerId: number) => {
    try {
      const response = await fetch(process.env.REACT_APP_GRAPHQL_URL || "", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: INSERT_ANSWER,
          variables: {
            assessmentId: Number(assessmentId),
            questionId: questionId,
            answerId: answerId,
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

  const handleNoteChange = (questionId: number, newContent: string) => {
    setNotes((prev) => {
      const existing = prev.findIndex((n) => n.questionId === questionId);

      if (existing !== -1) {
        const updatedNotes = [...prev];
        updatedNotes[existing].content = newContent;
        return updatedNotes;
      } else {
        return [...prev, { questionId, content: newContent }];
      }
    });
  };

  if (!currentQuestion) {
    return <p>Error...</p>;
  }

  return (
    <Layout>
      <Header title="Assessment" />
      <ProgressBar
        activeCategoryIndex={categories.findIndex(
          (c) => c.category_name === currentCategory?.category_name
        )}
        categories={categories.map((c) => ({
          name: c.category_name,
          totalQuestions: c.questions.length,
          answered: selectedAnswers.filter((a) =>
            c.questions.some((q) => q.question_id === a.questionId)
          ).length,
        }))}
      />
      <div className="mx-5 flex flex-col">
        <QuestionCard
          number={currentNumber}
          total={totalQuestions}
          category={
            currentCategory ? currentCategory.category_name : "Uncategorized"
          }
          question={currentQuestion.question_text}
        />
        <AnswerList
          options={currentQuestion.answers}
          selected={
            selectedAnswers.find(
              (a) => a.questionId === currentQuestion.question_id
            )?.answer ?? null
          }
          onSelect={(answer) => handleSelectAnswer(answer)}
        />
        {/* <NoteCard
          questionId={currentQuestion.question_id}
          onNoteChange={handleNoteChange}
          existingNote={
            notes.find((n) => n.questionId === currentQuestion.question_id)
              ?.content
          }
        /> */}
        <div
          className={`flex flex-row ${
            currentQuestionIndex > 0 ? "justify-between" : "justify-end"
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
