## 문제 1: 중첩된 데이터 업데이트 함수 작성하기

### 설명

중첩된 객체의 특정 필드 값을 업데이트하는 `nestedUpdate` 함수를 작성해봅시다.

### 예제 입력/출력

```js
const data = {
  user: {
    profile: {
      name: "Alice",
      age: 25,
    },
  },
};

const updatedData = nestedUpdate(
  data,
  ["user", "profile", "age"],
  (age) => age + 1,
);
console.log(updatedData.user.profile.age); // 26

function nestedUpdate() {
  // 어떤 로직으로 구현할 수 있을까요?
}
```

## 문제 2: 타임라인 다이어그램 분석 문제

### 설명

다음 코드의 실행 순서를 **타임라인 다이어그램으로 표현**하고, 예상 결과를 분석해봅시다. 타임라인 다이어그램은 직접 그려보아요!

### 코드

```js
let count = 0;

setTimeout(() => {
  count += 1;
  console.log("Timeout 1:", count);
  setTimeout(() => {
    count += 3;
    console.log("Nested Timeout:", count);
  }, 50);
}, 100);

setTimeout(() => {
  count += 2;
  console.log("Timeout 2:", count);
}, 50);

Promise.resolve().then(() => {
  count += 4;
  console.log("Microtask:", count);
});

count += 5;
console.log("Synchronous:", count);
```

## 문제 3: 안전한 재귀 호출 구현하기

### 설명

앗! 평탄화의 악마 평평데몬이 나타났습니다! 그는 **배열을 평탄화하는 재귀 함수**를 다음주까지 내놓지 않는다면 당신의 리포지토리를 전부 초기화하는 잔악무도한 저주를 걸겠다고 으름장을 놓고 돌아갔습니다. 세상에나...

### 예제 입력/출력

```js
function flattenArray() {
  // 어떤 로직으로 구현할 수 있을까요?
}

console.log(flattenArray([1, [2, [3, 4], 5], 6])); // [1, 2, 3, 4, 5, 6]
```
