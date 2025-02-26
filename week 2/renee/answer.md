# 2주차 퀴즈 풀이

## 다희님 문제

```js
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
	return todos.filter((todo) => showCompleted || !todo.completed);
}

// 사용 예시
addTodo('리팩토링 공부하기');
addTodo('운동하기');

toggleTodo(todos[0].id);

console.log(getVisibleTodos());
```

### 코드 냄새 분석하기

1. 전역 변수를 사용하고, 데이터를 직접 변경하고 있음
2. 함수가 명시적인 입출력보다 암묵적인 상태 변경에 의존하고 있음

### 개선하기

```js
const initialState = {
	todos: [],
	showCompleted: true,
};

function createTodo(title) {
	return { id: Date.now(), title, completed: false };
}

function addTodo(todos, title) {
	const newTodo = createTodo(title);
	return [...todos, newTodo];
}

function toggleTodo(todos, id) {
	return todos.map((todo) =>
		todo.id === id ? { ...todo, completed: !todo.completed } : todo
	);
}

function getVisibleTodos(todos, showCompleted) {
	return todos.filter((todo) => showCompleted || !todo.completed);
}

function updateState(state, newState) {
	return { ...state, ...newState };
}

// 사용 예시
let state = initialState;

state = updateState(state, {
	todos: addTodo(state.todos, '리팩토링 공부하기'),
});

state = updateState(state, {
	todos: addTodo(state.todos, '운동하기'),
});

state = updateState(state, {
	todos: toggleTodo(state.todos, state.todos[0].id),
});

const visibleTodos = getVisibleTodos(state.todos, state.showCompleted);

console.log(visibleTodos);
```

1. 액션, 데이터, 계산 분리

- 데이터: `initialState`
- 계산: `createTodo`, `addTodo`, `toggleTodo`, `getVisibleTodos`
- 액션: `updateState`

2. 불변성 유지

- 기존 값을 변경하지 않고, 새로운 값을 반환
- 스프레드 연산자나 map, filter와 같은 메서드 사용

3. 하나의 함수는 하나의 역할만
4. 명시적 입출력

- 전역 변수를 사용하지 않고, 매개변수를 통해 값을 변경
