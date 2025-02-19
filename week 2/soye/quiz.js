const QUIZ_LIST = [
  {
    quiz: "Q1. 대한민국의 수도는 이름은?",
    answer: "서울",
    completed: false,
  },
  {
    quiz: "Q2. HTML은 무엇의 약자인가?",
    answer: "Hyper Text Markup Language",
    completed: false,
  },
  {
    quiz: "Q3. CSS는 무엇의 약자인가?",
    answer: "Cascading Style Sheet",
    completed: false,
  },
  {
    quiz: "Q4. 구글이 만들어 서비스하고 있으며 점유율 1위의 브라우저의 종류는?",
    answer: "Chrome",
    completed: false,
  },
];

const setQuizList = (quiz, answer) => {
  QUIZ_LIST.push({ quiz, answer, completed: false });
  QUIZ_LIST.map((quiz) => {
    console.log("quiz: ", quiz.quiz);
  });
};

setQuizList("Q5. 1 + 1 = ?", "2");

export default {};
