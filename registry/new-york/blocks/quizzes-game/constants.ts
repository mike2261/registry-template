import { Quiz } from "./type";

export const MOCK_DATA: Quiz[] = [
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
