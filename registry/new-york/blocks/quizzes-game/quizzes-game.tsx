"use client";

import { useState } from "react";
import { Button } from "../../ui/button";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  BookIcon,
  CheckIcon,
  RotateCcwIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type Quiz = {
  choices: string[];
  question: string;
  correct_answer: number;
  explanation: string;
};

export const QuizzesGame = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>(MOCK_DATA);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const navigateQuiz = (direction: "next" | "prev") => {
    setSelectedAnswer(null);
    setShowExplanation(false);
    if (direction === "next") {
      setCurrentQuestionIndex((prev) =>
        prev < quizzes.length - 1 ? prev + 1 : prev
      );
      return;
    }
    setCurrentQuestionIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleSelectAnswer = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  return (
    <div className="flex flex-col gap-y-4 w-full items-center p-4">
      <Question question={quizzes[currentQuestionIndex].question} />

      <div className="grid grid-cols-2 w-full gap-4">
        {quizzes[currentQuestionIndex].choices.map((answer, index) => {
          const isSelected = selectedAnswer === index;
          const isCorrect =
            index === quizzes[currentQuestionIndex].correct_answer &&
            showExplanation;
          const isIncorrect =
            isSelected &&
            index !== quizzes[currentQuestionIndex].correct_answer &&
            showExplanation;
          const type = isCorrect
            ? "correct"
            : isIncorrect
            ? "incorrect"
            : "neutral";

          return (
            <AnswerOption
              key={answer}
              answer={answer}
              type={type}
              isSelected={isSelected}
              onClick={() => handleSelectAnswer(index)}
            />
          );
        })}
      </div>
      <QuizControl
        navigateQuiz={navigateQuiz}
        quizIndex={currentQuestionIndex}
        totalQuizzes={quizzes.length}
        checkAnswer={() => setShowExplanation(true)}
        resetQuiz={() => {
          setSelectedAnswer(null);
          setShowExplanation(false);
        }}
        isSelectedAnswer={selectedAnswer !== null}
      />
      {showExplanation && (
        <Explanation explanation={quizzes[currentQuestionIndex].explanation} />
      )}
    </div>
  );
};

const Question = ({ question }: { question: string }) => {
  return (
    <div className="flex w-full cursor-pointer flex-col gap-4 rounded-lg border-gray-300 border-2 border-b-4 bg-(--card) px-2 py-4 md:px-5 md:py-7">
      <span className="whitespace-pre-line text-base md:text-lg">
        {question}
      </span>
    </div>
  );
};

const AnswerOption = ({
  answer,
  type,
  isSelected,
  onClick,
}: {
  answer: string;
  type: "correct" | "incorrect" | "neutral";
  isSelected: boolean;
  onClick: () => void;
}) => {
  const baseClassname =
    "border-2 border-gray-300 p-3 md:p-5 rounded-lg cursor-pointer";

  const getClassnameByType = () => {
    switch (type) {
      case "correct":
        return cn(baseClassname, "border-green-500 bg-green-100");
      case "incorrect":
        return cn(baseClassname, "border-red-300 bg-red-100");
      default:
        if (isSelected) {
          return cn(baseClassname, "border-gray-500 bg-gray-100");
        }
        return cn(baseClassname);
    }
  };

  return (
    <div onClick={onClick} className={getClassnameByType()}>
      {answer}
    </div>
  );
};

export const QuizControl = ({
  navigateQuiz,
  quizIndex,
  totalQuizzes,
  checkAnswer,
  resetQuiz,
  isSelectedAnswer,
}: {
  navigateQuiz: (direction: "next" | "prev") => void;
  quizIndex: number;
  totalQuizzes: number;
  checkAnswer: () => void;
  resetQuiz: () => void;
  isSelectedAnswer: boolean;
}) => {
  return (
    <div className="flex justify-between w-full items-center">
      <div className="flex gap-x-2">
        <Button
          variant={"outline"}
          onClick={() => navigateQuiz("prev")}
          disabled={quizIndex === 0}
          className="rounded-full size-9 border-gray-300 cursor-pointer"
        >
          <ArrowLeftIcon className="size-4" />
        </Button>
        <Button
          variant={"outline"}
          onClick={() => navigateQuiz("next")}
          disabled={quizIndex === totalQuizzes - 1}
          className="rounded-full size-9 border-gray-300 cursor-pointer"
        >
          <ArrowRightIcon className="size-4" />
        </Button>
      </div>

      <div className="flex gap-x-2 items-center">
        <Button
          onClick={resetQuiz}
          disabled={!isSelectedAnswer}
          className="rounded-full size-9 border-gray-300 cursor-pointer"
        >
          <RotateCcwIcon className="size-4" />
        </Button>
        <Button
          onClick={checkAnswer}
          disabled={!isSelectedAnswer}
          className="rounded-xl cursor-pointer"
        >
          Kiểm tra
          <CheckIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
};

const Explanation = ({ explanation }: { explanation: string }) => {
  return (
    <div className="flex gap-3 rounded-xl bg-[#D9E2FF4D] p-4 w-full mt-2">
      <div className="w-[3px] flex-shrink-0 self-stretch rounded-full bg-[#0C66E4]" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-2">
          <BookIcon className="size-5" />
          <p>Giải thích</p>
        </div>
        <p className="whitespace-pre-line text-sm">{explanation}</p>
      </div>
    </div>
  );
};

const MOCK_DATA: Quiz[] = [
  {
    choices: [
      "Paulo Bento",
      "Jose Peseiro",
      "Sir Alex Ferguson",
      "Carlos Queiroz",
    ],
    question:
      "Ai là huấn luyện viên đặc biệt quan trọng với Nani từ khi anh còn ở học viện?",
    explanation:
      "Paulo Bento là người tin tưởng và giúp đỡ Nani từ khi còn ở học viện.",
    correct_answer: 0,
  },
  {
    choices: ["Premier League", "Champions League", "Europa League", "FA Cup"],
    question: "Jose Peseiro đã cho Nani ra mắt ở giải đấu nào?",
    explanation:
      "Jose Peseiro đã trao cho Nani cơ hội ra mắt ở Champions League.",
    correct_answer: 1,
  },
  {
    choices: ["Sợ hãi", "Vui vẻ", "Thích thú", "Bình thường"],
    question:
      "Cảm xúc ban đầu của Nani khi làm việc với Sir Alex Ferguson là gì?",
    explanation:
      "Nani từng rất sợ Ferguson vì không hiểu tiếng Anh và sự nghiêm khắc của ông.",
    correct_answer: 0,
  },
  {
    choices: [
      "Cristiano Ronaldo",
      "Anderson",
      "Patrice Evra",
      "Carlos Queiroz",
    ],
    question:
      "Ai là người nói với Nani rằng anh là một phần quan trọng trong đội hình của Ferguson?",
    explanation:
      "Patrice Evra đã nói với Nani rằng anh là một phần quan trọng trong đội hình của Ferguson.",
    correct_answer: 2,
  },
];
