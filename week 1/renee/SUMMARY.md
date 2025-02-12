# 함수형 프로그래밍 스터디 (1~5장 정리)

> 💡 [쏙쏙 들어오는 함수형 코딩](https://product.kyobobook.co.kr/detail/S000001952246)을 읽고, 새롭게 알게 된 점을 정리했습니다.

---

## 1. 함수형 프로그래밍과 사고

### 함수형 프로그래밍이란?

**부수 효과**와 **순수 함수**를 기반으로 하는 범용 프로그래밍 패러다임이다.

- 부수 효과도 필요할 때는 사용할 수 있으며, 이를 잘 다루는 것이 함수형 프로그래밍의 핵심이다.
- 코드를 **액션, 계산, 데이터**로 구분하여 분석하는 것이 중요하다.
- 함수형 프로그래밍을 적용하면 **분산 시스템을 보다 효율적으로 관리**할 수 있다.

---

## 2. 액션과 계산, 데이터

### 액션 (부수 효과 함수)

**외부 세계와 상호작용하는 작업**이며, 함수형 프로그래밍에서는 순수 계산과 명확히 구분해야 한다.

**특징:**

- **외부 세계와의 상호작용**이 필요하다.
- **실행 순서에 의존**한다.
- **비순수성**을 가지므로 테스트와 유지보수가 어렵다.

**개선 방법:**

- 액션을 최소화하고, **작은 단위로 나눈다**.
- **외부와의 상호작용과 시점 의존성을 제한**해야 한다.

### 계산 (순수 함수)

**주어진 입력값을 바탕으로 출력값을 생성하는 순수한 작업**을 의미한다.

**특징:**

- **불변성**을 유지한다.
- **순수성**: 동일한 입력에 대해 항상 동일한 출력을 반환한다.
- **결합 가능성**: 여러 개의 계산을 쉽게 조합할 수 있다.

**장점:**

- 테스트가 용이하다.
- 정적 분석이 가능하다.
- 다른 함수들과 쉽게 조합할 수 있다.

### 데이터

**이벤트에 대한 사실을 표현**하며, JavaScript의 기본 데이터 타입으로 구현된다.

**특징:**

- **도메인을 표현**하는 데 사용된다.
- **불변성**을 유지한다.
- **직렬화가 가능**하여 저장과 전송이 용이하다.

**불변성을 유지하는 방법:**

- **카피-온-라이트**: 변경할 때 복사본을 생성하여 원본을 유지한다.
- **방어적 복사**: 데이터를 보관할 때 복사본을 만들어 사용한다.

---

## 3. 액션에서 계산 분리하기

### 원칙

- 함수에 인자 외의 다른 입력이 주어진다면 **암묵적 입력**이다.
- 리턴값 외에 다른 출력이 발생한다면 **암묵적 출력**이다.
- 암묵적 입출력(부수 효과)은 지양해야 한다.

### 계산 분리 과정

1. **계산 코드를 찾아 분리한다.**
2. **새로운 함수의 암묵적 입출력을 찾는다.**
3. **암묵적 입출력을 인자와 리턴값으로 변경한다.**

### 예제 코드 (리팩토링 과정)

#### 원본 코드 (부수 효과가 존재)

```typescript
function update_tax_dom() {
	set_tax_dom(shopping_cart_total * 0.1);
}
```

#### 리팩토링 후

```typescript
function update_tax_dom() {
	set_tax_dom(calc_tax(shopping_cart_total));
}

function calc_tax(amount: number): number {
	return amount * 0.1;
}
```

**개선된 점:**

- `calc_tax()`를 분리하여 **순수 함수로 변경**함.
- `update_tax_dom()`에서 **액션과 계산을 분리**하여 유지보수성을 높임.

---

## 4. 더 좋은 액션 만들기

모든 액션을 제거할 수는 없지만, **암묵적 입출력을 줄이면 개선할 수 있다**.

### 비즈니스 요구 사항과 설계

- 리팩토링은 **코드의 구조를 변경**하는 것이며, **동작을 변경하는 것이 아니다**.
- 함수의 크기가 작을수록 이해하기 쉽다.
- 배열을 복사하는 비용이 항상 비싼 것은 아니다. 최신 런타임과 가비지 컬렉터는 메모리를 효과적으로 관리한다.

### 원칙

- **암묵적 입출력은 적을수록 좋다.**
- 암묵적 입출력이 많으면 **다른 컴포넌트와 강하게 결합**되므로, 모듈성을 유지하려면 이를 최소화해야 한다.

### 계산을 분류하고 계층 정리하기

- 코드를 분리하다 보면 **의미 있는 계층이 자연스럽게 형성**된다.
- 작은 단위의 코드는 **재사용하기 쉽고, 유지보수하기 쉽고, 테스트하기 쉽다**.

**예제: `add_item()` 리팩토링**

```typescript
function add_item(cart: any[], item: any): any[] {
	return [...cart, item];
}
```

**장점:**

- 장바구니(cart)와 아이템(item)에 의존하지 않고 **배열과 항목을 인자로 받도록 개선**함.
- `copy-on-write` 패턴을 활용하여 **불변성을 유지**함.

---

## 5. 액션 개선을 위한 핵심 원칙

1. 암묵적 입력과 출력은 인자와 리턴값으로 바꾼다.
2. 설계는 엉켜있는 것을 푸는 과정이다. → 필요하면 언제든 다시 합칠 수 있다.
3. 각 함수가 하나의 역할만 하도록 분리하면, 개념 중심으로 쉽게 구성할 수 있다.

이러한 원칙을 따르면, 유지보수성이 뛰어난 함수형 코드를 작성할 수 있다.
