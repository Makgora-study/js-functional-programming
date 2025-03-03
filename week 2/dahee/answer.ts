// [레니님 문제]
// https://codesandbox.io/p/sandbox/week2-quiz-forked-9mfwrn

//[소예님 문제]

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

  const addAndLogQuizzes = (quizList, quiz, answer) => {
    return quizList
      .concat({ quiz, answer, completed: false })
      .reduce((_, { quiz }) => {
        logQuiz(quiz)
        return quizList;
      }, []);
  };

  const logQuiz = (quiz)=>{
    console.log("quiz: ", quiz.quiz)
  }
  
 addAndLogQuizzes(QUIZ_LIST, "Q5. 1 + 1 = ?", "2");
  
  export default {};
  

  //내 문제
const addTodo = (todos, title) => [...todos, { id: Date.now(), title, completed: false }];

const toggleTodo = (todos, id) => 
  todos.map(todo => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));

const getVisibleTodos = (todos, showCompleted) => 
  todos.filter(todo => showCompleted || !todo.completed);

// 사용 예시
let todos = [];
let showCompleted = true;

todos = addTodo(todos, "리팩토링 공부하기");
todos = addTodo(todos, "운동하기");

todos = toggleTodo(todos, todos[0].id);

console.log(getVisibleTodos(todos, showCompleted));
