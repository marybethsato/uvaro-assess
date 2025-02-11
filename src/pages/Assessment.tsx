import { useEffect, useState } from "react";
import Layout from "../components/Layout";

import AnswerList from "../components/assessment/AnswerList";
import Header from "../components/assessment/Header";
import QuestionCard from "../components/assessment/QuestionCard";

import { useNavigate } from "react-router-dom";
import NoteCard from "../components/assessment/NoteCard";
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
  const navigate = useNavigate();

  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        console.log(process.env.REACT_APP_GRAPHQL_URL);
        const res = await fetch(process.env.REACT_APP_GRAPHQL_URL || "", {
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
      console.log("Note:", notes);
    } else {
      console.log("All answers:", selectedAnswers);
      console.log("All Notes:", notes);
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
        <NoteCard
          questionId={currentQuestion.question_id}
          onNoteChange={handleNoteChange}
          existingNote={
            notes.find((n) => n.questionId === currentQuestion.question_id)
              ?.content
          }
        />
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
