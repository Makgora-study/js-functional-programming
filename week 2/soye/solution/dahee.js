const createTodo = (title, todos) => {
  return { id: todos.length, title, completed: false };
};

function addTodo(todos, title) {
  const todoCopy = [...todos];
  const newTodo = createTodo(title, todos);
  todoCopy.push(newTodo);
  return todoCopy;
}

function toggleTodoCompletion(todos, id) {
  const todoCopy = [...todos];
  return todoCopy.map((todo) => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });
}

function getVisibleTodos(todos, showCompleted) {
  return todos.filter((todo) => showCompleted || !todo.completed);
}

let todos = [];
let filterState = { showCompleted: true };

// 사용 예시
todos = addTodo(todos, "리팩토링 공부하기");
todos = addTodo(todos, "운동하기");
todos = addTodo(todos, "운동하기2");
todos = toggleTodoCompletion(todos, todos[0].id);

const visiableTodo = getVisibleTodos(todos, filterState.showCompleted);

console.log(visiableTodo);

export default {};
