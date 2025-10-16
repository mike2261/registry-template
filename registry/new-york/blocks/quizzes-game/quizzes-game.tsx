import { useState } from "react";
import { Quiz } from "./type";
import { MOCK_DATA } from "./constants";

export const QuizzesGame = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>(MOCK_DATA);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const navigateQuiz = (direction: "next" | "prev") => {};

  const prevQuiz = () => {
    if (currentQuestionIndex <= 0) return;
    navigateQuiz("prev");
  };

  const nextQuiz = () => {
    if (currentQuestionIndex >= quizzes.length - 1) return;
    navigateQuiz("next");
  };

  const isCorrectAnswer = () => {
    if (selectedAnswer === null) return false;
    return quizzes[currentQuestionIndex].correct_answer === selectedAnswer;
  };

  const handleSelectAnswer = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
  };

  return <div>Quizzes Game Component</div>;
};



const AnswerOption = () => {

}