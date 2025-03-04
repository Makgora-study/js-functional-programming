# 함수형 프로그래밍 스터디 3주차 문제

저번주에는 문제를 쓸데없이 복잡하게 낸 것 같다는 생각이 들었습니다. 문제를 낸 본인도 문제를 풀다가 이게 뭐야 싶더라고요. 매주 새롭게 학습한 내용을 잘 활용하고 있는 것 같지도 않고, 문제가 너무 길다 보니 미리 푸는 습관을 들이기가 어려웠던 것 같습니다.

그래서 이번 주차에는, 책에서 배운 내용을 직접적으로 적용해볼 수 있는 퀴즈 형태로 문제를 내 보기로 했습니다. **매일 비타민을 챙겨먹는 것처럼** 간단하게 풀어볼 수 있는 문제 5개로 구성되어 있어요. 그럼 하나씩 풀어볼까요?

## 문제

### 1일차 문제

> 아래 코드에는 비슷한 기능을 하는 여러 함수들이 있어요. 함수 이름의 암묵적 인자를 드러내는 방법으로 개선할 수 있을 것 같은데요?

```ts
function getUserName(user: { name: string; email: string; age: number }) {
	return user.name;
}

function getUserEmail(user: { name: string; email: string; age: number }) {
	return user.email;
}

function getUserAge(user: { name: string; email: string; age: number }) {
	return user.age;
}
```

### 2일차 문제

> 아래 코드는 다양한 작업을 수행하면서 로깅과 에러 처리를 하고 있어요. 반복되는 패턴을 고차 함수로 추출할 수 있을 것 같네요!

```ts
function processUserData(data: any) {
	console.log('Processing user data...');
	try {
		const result = { ...data, processed: true };
		console.log('User data processed successfully');
		return result;
	} catch (error) {
		console.error('Error processing user data:', error);
		throw error;
	}
}

function calculateMetrics(data: any) {
	console.log('Calculating metrics...');
	try {
		const result = { ...data, metrics: { value: 42 } };
		console.log('Metrics calculated successfully');
		return result;
	} catch (error) {
		console.error('Error calculating metrics:', error);
		throw error;
	}
}

function saveToDatabase(data: any) {
	console.log('Saving to database...');
	try {
		const result = { ...data, saved: true, timestamp: new Date() };
		console.log('Data saved successfully');
		return result;
	} catch (error) {
		console.error('Error saving to database:', error);
		throw error;
	}
}
```

### 3일차 문제

> 아래 코드는 다양한 방법으로 유효성 검사를 진행하고 있네요. 함수를 반환하는 함수 패턴으로 개선해볼 수 있을 것 같은데요?

```ts
function validateString(value: any): boolean {
	return typeof value === 'string';
}

function validateNumber(value: any): boolean {
	return typeof value === 'number' && !isNaN(value);
}

function validateBoolean(value: any): boolean {
	return typeof value === 'boolean';
}

function validateEmail(value: any): boolean {
	if (typeof value !== 'string') return false;
	return /\S+@\S+\.\S+/.test(value);
}
```

### 4일차 문제

> 이런, 전통적인 for문과 if문의 향연이네요. 책에서 배운 함수형 도구를 활용한다면 냄새가 덜 나는 코드로 바꿀 수 있겠어요!

```ts
const products = [
	{ id: 1, name: '노트북', price: 1200000, category: '전자제품', stock: 5 },
	{ id: 2, name: '스마트폰', price: 800000, category: '전자제품', stock: 10 },
	{ id: 3, name: '키보드', price: 100000, category: '액세서리', stock: 20 },
	{ id: 4, name: '마우스', price: 50000, category: '액세서리', stock: 0 },
	{ id: 5, name: '모니터', price: 400000, category: '전자제품', stock: 3 },
];

function calculateElectronicsValue(products: any[]) {
	let totalValue = 0;

	for (let i = 0; i < products.length; i++) {
		const product = products[i];

		if (product.category === '전자제품' && product.stock > 0) {
			totalValue += product.price * product.stock;
		}
	}

	return totalValue;
}
```

### 5일차 문제

> 아래 코드는 사용자 데이터를 여러 과정을 통해 처리하고 있어요. 데이터 파이프라인을 만들어볼 수 있을 것 같은데요? 활성 사용자, 성인 사용자, 포인트가 가장 높은 사용자, 사용자 이름과 포인트로 구현된 새 객체 배열을 반환하는 함수를 각각 구현해 보아요

```ts
const users = [
	{ id: 1, name: 'soye', age: 25, active: true, points: 250 },
	{ id: 2, name: 'renee', age: 32, active: false, points: 100 },
	{ id: 3, name: 'woori', age: 28, active: true, points: 350 },
	{ id: 4, name: '김자스', age: 22, active: true, points: 180 },
	{ id: 5, name: '최타스', age: 35, active: false, points: 280 },
];

function isActive(user: any) {
	return user.active === true;
}

function isAdult(user: any) {
	return user.age >= 18;
}

function getUserName(user: any) {
	return user.name;
}

function getPoints(user: any) {
	return user.points;
}
```

## 힌트

> ⚠️ 잠깐! 힌트를 보기 전 충분히 고민해 봤나요? 그렇다면 아래 힌트를 보고 문제를 푸는 데 도움을 얻을 수 있을 거예요.

### 1일차 문제

필드명을 인자로 받는 함수를 작성해볼까요?

### 2일차 문제

작업 내용을 콜백으로 받는 함수를 작성해볼까요?

### 3일차 문제

검증 로직을 생성하는 팩토리 함수를 생성해볼까요? 책에서 비슷한 내용을 다룬 것 같아요.

### 4일차 문제

filter, map, reduce를 체이닝해볼까요?

### 5일차 문제

지금까지 배운 함수형 도구를 체이닝해서 파이프라인을 구현해볼까요?
