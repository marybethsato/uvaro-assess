import { useEffect, useState } from "react";
import Layout from "../components/Layout";

import AnswerList from "../components/assessment/AnswerList";
import Header from "../components/assessment/Header";
import QuestionCard from "../components/assessment/QuestionCard";

import { useNavigate } from "react-router-dom";
import Note from "../components/assessment/Note";
import { ALL_CATEGORIES } from "../graphql/queries";

interface Answer {
  answer_id: number;
  answer_text: string;
}

interface Question {
  question_id: number;
  question_text: string;
  answers: Answer[];
}

interface Category {
  category_id: number;
  category_name: string;
  questions: Question[];
}

interface SelectedAnswer {
  questionId: number;
  answer: string;
}

const Assessment = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("http://localhost:4000/graphql", {
          method: "POST",
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

        if (response.errors) {
          throw new Error(
            `GraphQL error: ${response.errors[0].message || "Unknown error"}`
          );
        }

        const data = response.data;

        if (data && data.allCategories) {
          setCategories(data.allCategories);
          if (data.allCategories.length > 0) {
            setQuestions(data.allCategories[0].questions);
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

  const handleSelectAnswer = (answer: string) => {
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

  const handleNext = () => {
    if (
      !selectedAnswers.find(
        (item) => item.questionId === currentQuestion.question_id
      )
    ) {
      alert("Please select an answer.");
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      console.log("All answers:", selectedAnswers);
      navigate("/completeAssessment");
    }
  };

  const currentCategory = categories.find((category) =>
    category.questions.some(
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

  return (
    <Layout>
      <Header />
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
          options={currentQuestion.answers.map((a) => a.answer_text)}
          selected={
            selectedAnswers.find(
              (a) => a.questionId === currentQuestion.question_id
            )?.answer || ""
          }
          onSelect={(answer) => handleSelectAnswer(answer)}
        />
        <Note />
        <button
          className="px-4 py-2 border border-gray-300 font-bold hover:bg-gray-100 self-end rounded-md cursor-pointer"
          onClick={handleNext}
        >
          → NEXT
        </button>
      </div>
    </Layout>
  );
};

export default Assessment;
