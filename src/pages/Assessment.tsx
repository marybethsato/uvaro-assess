import { useState } from "react";
import Layout from "../components/Layout";

import AnswerList from "../components/assessment/AnswerList";
import Header from "../components/assessment/Header";
import Question from "../components/assessment/Question";

import { useNavigate } from "react-router-dom";
import BaseButton from "../components/buttons/BaseButton";
import questionsData from "../sampleData/questions.json";
import { QuestionType } from "../types/question";
import Note from "../components/assessment/Note";

const Assessment = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    { questionId: number; answer: string }[]
  >([]);

  const questions: QuestionType[] = questionsData;
  const currentQuestion = questions[currentQuestionIndex];
  const navigate = useNavigate();

  const handleSelectAnswer = (answer: string) => {
    const updatedAnswers = selectedAnswers.filter(
      (item) => item.questionId !== currentQuestion.id
    );
    setSelectedAnswers([
      ...updatedAnswers,
      { questionId: currentQuestion.id, answer },
    ]);
  };

  const handleNext = () => {
    if (
      !selectedAnswers.find((item) => item.questionId === currentQuestion.id)
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

  return (
    <Layout>
      <Header />
      <div className="mx-5 flex flex-col">
        <Question
          number={currentQuestionIndex + 1}
          total={questions.length}
          category={currentQuestion.category}
          question={currentQuestion.question}
        />
        <AnswerList
          options={currentQuestion.answers}
          selected={
            selectedAnswers.find(
              (item) => item.questionId === currentQuestion.id
            )?.answer || null
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
