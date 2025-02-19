// 다희님 문제
interface Order {
	item: string;
	price: number;
	quantity: number;
}

const orders: Order[] = [
	{ item: "Laptop", price: 1000, quantity: 2 },
	{ item: "Mouse", price: 25, quantity: 3 },
	{ item: "Keyboard", price: 50, quantity: 1 },
];
//
const calculateTotalPrices = (orders: Order[]) => {
	return orders.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);
};

// 소예님 문제
type UserType = {
	name: string;
	job: string;
	employHistory: number;
};

const averageStandard: number = 60;
const users: UserType[] = [
	{ name: "soye", job: "none", employHistory: 6 },
	{ name: "woori", job: "developer", employHistory: 120 },
	{ name: "gaeddong", job: "poo", employHistory: 0 },
	{ name: "dahee", job: "developer", employHistory: 24 },
	{ name: "gabae", job: "developer", employHistory: 36 },
	{ name: "yeso", job: "casher", employHistory: 80 },
	{ name: "dev-god", job: "developer", employHistory: 240 },
];

const isEmployed = (job: string): boolean => job !== "none";

const sumEmployHistory = (filteredUsers: UserType[]): number =>
	filteredUsers.reduce((total, user) => total + user.employHistory, 0);

const calculateAverage = (users: UserType[], job: string): number => {
	const jobUsers = users.filter((user) => user.job === job);
	return Math.ceil(sumEmployHistory(jobUsers) / jobUsers.length);
};

const logMessage = (average: number, averageStandard: number) => {
	const message =
		average > averageStandard
			? `${average}개월이라니 이 분야는 평균 경력이 높구만`
			: `${average}개월이라니 이 분야는 신생인가?`;

	console.log(message);
};

const evaluateSector = (
	users: UserType[],
	job: string,
	averageStandard: number,
): void => {
	if (!isEmployed(job)) {
		throw new Error(
			"직업이 없는 사람은 그냥 백수입니다... 실업통계로 계산해주세요",
		);
	}

	const average = calculateAverage(users, job);
	logMessage(average, averageStandard);
};

evaluateSector(users, "developer", 60);

// 내 문제
type ReviewState = {
	readonly totalScore: number;
	readonly reviewCount: number;
};

// 초기 상태를 생성하는 함수
const createInitialState = (): ReviewState => ({
	totalScore: 0,
	reviewCount: 0,
});

// 새로운 리뷰를 처리하는 순수 함수
const processReview = (
	currentState: ReviewState,
	score: number,
): ReviewState => ({
	totalScore: currentState.totalScore + score,
	reviewCount: currentState.reviewCount + 1,
});

// 평균 점수를 계산하는 순수 함수
const calculateAverage = (state: ReviewState): number =>
	state.reviewCount === 0 ? 0 : state.totalScore / state.reviewCount;

// 리뷰 정보를 표시하는 순수 함수
const formatReviewDisplay = (average: number): string =>
	`현재 평균 리뷰 점수: ${average.toFixed(2)}`;

// 전체 리뷰 처리 파이프라인
const processAndDisplayReview = (
	state: ReviewState,
	score: number,
): [ReviewState, string] => {
	const newState = processReview(state, score);
	const average = calculateAverage(newState);
	const display = formatReviewDisplay(average);
	return [newState, display];
};

// 사용 예시
let state = createInitialState();

// 각 리뷰 처리
const reviews = [4, 5, 3];
reviews.forEach((score) => {
	const [newState, display] = processAndDisplayReview(state, score);
	state = newState;
	console.log(display);
});

export {};
