# 2주차 퀴즈 풀이

## dahee의 문제

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

### 느낀점

- `updateTodo`를 사용하는 부분은 리액트의 reducer를 생각해 보았습니다.
- todo의 추가, 삭제, 토글은 action이고, 내부에 담기는 정보는 payload라는 생각이 들었어요.

## soye의 문제

[문제 확인하기](https://codesandbox.io/p/sandbox/smcqwl?file=%2Fsrc%2FApp.tsx%3A18%2C1)

### 코드 냄새 분석하기

1. 전역 변수 사용과 데이터 직졉 변경
2. 암묵적 입출력
3. 인라인에서 사용되고 있는 핸들러(냄새나요)

~~사실 어디까지 개선해야하나 고민을 많이 하긴 했는데요...~~

### 코드 개선하기

코드의 길이가 길기 때문에 단계별로 개선해볼까요?

#### 데이터, 액션, 계산 분리하기

전역 변수를 사용하고, 액션과 계산이 분리되어 있지 않고 tsx 내부에 인라인 형태로 작성되어 있습니다.
TS를 사용하니, 초기 상태와 타입을 먼저 지정해봅시다.

```tsx
type Quiz = {
	quiz: string;
	example: string[];
	answer: string;
	completed: boolean;
};

const INITIAL_QUIZ_LIST: Quiz[] = [
	{
		quiz: '대한민국의 수도는 이름은?',
		example: ['도쿄', '베이징', '서울', '워싱턴'],
		answer: '서울',
		completed: false,
	},
	{
		quiz: '구글이 만들어 서비스하고 있으며 점유율 1위의 브라우저의 종류는?',
		example: ['크롬', '사파리', '오페라', '삼성'],
		answer: '크롬',
		completed: false,
	},
];
```

퀴즈의 상태 관리 역시 개선할 수 있다면 좋겠죠?

```tsx
const [quizzes, setQuizzes] = useState<Quiz[]>(INITIAL_QUIZ_LIST);
const [newQuiz, setNewQuiz] = useState({
	quiz: '',
	answer: '',
	example: [] as string[],
	exampleItem: '',
});
```

다음으로 계산을 분리해봅시다. 퀴즈의 상태를 토글하고, 새 퀴즈를 추가하고, 보기(예제) 목록에 새 항목을 추가하는 것은 계산입니다. 부수효과를 최소화하고, 암묵적 입출력을 줄여야 해요.

```tsx
const toggleQuizCompletion = (
	quizToToggle: Quiz,
	isCorrect: boolean
): Quiz[] => {
	if (!isCorrect) return quizzes;

	return quizzes.map((quiz) =>
		quiz === quizToToggle ? { ...quiz, completed: true } : quiz
	);
};

const addQuizToList = (
	currentQuizzes: Quiz[],
	newQuizData: Omit<Quiz, 'completed'>
): Quiz[] => {
	return [...currentQuizzes, { ...newQuizData, completed: false }];
};

const addExampleToList = (examples: string[], newExample: string): string[] => {
	if (!newExample.trim()) return examples;
	return [...examples, newExample];
};
```

이제 액션을 분리해봅시다. 퀴즈의 상태를 직접적으로 변경하는 핸들러 함수들은 모두 액션입니다.

```tsx
const handleQuizInputChange = (field: keyof typeof newQuiz, value: string) => {
	setNewQuiz((prev) => ({ ...prev, [field]: value }));
};

const handleAddExample = () => {
	if (!newQuiz.exampleItem.trim()) return;

	setNewQuiz((prev) => ({
		...prev,
		example: addExampleToList(prev.example, prev.exampleItem),
		exampleItem: '',
	}));
};

const handleAddQuiz = () => {
	if (!newQuiz.quiz || !newQuiz.answer || newQuiz.example.length === 0) return;

	const quizData = {
		quiz: newQuiz.quiz,
		answer: newQuiz.answer,
		example: newQuiz.example,
	};

	setQuizzes((prev) => addQuizToList(prev, quizData));

	setNewQuiz({
		quiz: '',
		answer: '',
		example: [],
		exampleItem: '',
	});
};

const handleCheckAnswer = (quiz: Quiz, selectedAnswer: string) => {
	const isCorrect = quiz.answer === selectedAnswer;
	setQuizzes((prev) => toggleQuizCompletion(quiz, isCorrect));
};
```

그러보고니 퀴즈 컴포넌트 자체도 중복되어 보입니다. 내친김에 이 부분도 개선해봅시다.

```tsx
const QuizSection = ({ title }: { title: string }) => (
	<div style={{ width: '50%', border: '1px solid black', padding: '20px' }}>
		<h2>{title}의 퀴즈</h2>
		{quizzes.map((quiz, index) => (
			<div
				key={index}
				style={{
					marginBottom: '20px',
					backgroundColor: quiz.completed ? 'greenyellow' : '',
				}}
			>
				<p>
					Q{index + 1}. {quiz.quiz}
				</p>
				<div>
					{quiz.example.map((exam, exIndex) => (
						<button
							key={exIndex}
							onClick={() => handleCheckAnswer(quiz, exam)}
							style={{ marginRight: '5px' }}
						>
							{exIndex + 1}. {exam}
						</button>
					))}
				</div>
			</div>
		))}
		<div>
			문제
			<input
				type='text'
				value={newQuiz.quiz}
				onChange={(e) => handleQuizInputChange('quiz', e.currentTarget.value)}
			/>
		</div>
		<div>
			예제
			<input
				type='text'
				value={newQuiz.exampleItem}
				onChange={(e) =>
					handleQuizInputChange('exampleItem', e.currentTarget.value)
				}
			/>
			<button onClick={handleAddExample}>예제추가</button>
			{newQuiz.example.map((exam, index) => (
				<span key={index}>{exam},</span>
			))}
		</div>
		<div>
			정답
			<input
				type='text'
				value={newQuiz.answer}
				onChange={(e) => handleQuizInputChange('answer', e.currentTarget.value)}
			/>
		</div>
		<button onClick={handleAddQuiz}>퀴즈추가</button>
	</div>
);
```

앞서 분리했던 액션이 컴포넌트에서 잘 사용되고 있는 것을 확인할 수 있습니다.

```tsx
<div className='App'>
	<h1>퀴즈 쇼쇼쇼</h1>
	<div style={{ display: 'flex' }}>
		<QuizSection title='User1' />
		<QuizSection title='User2' />
	</div>
</div>
```

앱 컴포넌트 내부에서는 이렇게 사용할 수 있겠네요!

### 느낀점

- 컴포넌트 내부에서 함수형 사고를 적용하려니 복잡해서 어려웠습니다
- 타입스크립트를 사용한 타입은 덤이었고요. 이 부분은 Claude의 도움을 조금 받았습니다.
- 상태를 사용하기 때문에, 계산과 액션의 조금 더 명확한 분리 기준이 필요했습니다.
