let todos = [];
let showCompleted = true;

function addTodo(title) {
  const newTodo = { id: Date.now(), title, completed: false };
  todos.push(newTodo); 
}

function toggleTodo(id) {
  for (let todo of todos) {
    if (todo.id === id) {
      todo.completed = !todo.completed; 
    }
  }
}

function getVisibleTodos() {
  return todos.filter(todo => showCompleted || !todo.completed);
}

// 사용 예시
addTodo("리팩토링 공부하기");
addTodo("운동하기");

toggleTodo(todos[0].id);

console.log(getVisibleTodos());
