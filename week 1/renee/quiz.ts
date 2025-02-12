let totalScore = 0;
let reviewCount = 0;

function processReview(score: number): void {
	totalScore += score;
	reviewCount++;
	updateReviewDisplay();
}

function updateReviewDisplay(): void {
	const average = totalScore / reviewCount;
	console.log(`현재 평균 리뷰 점수: ${average.toFixed(2)}`);
}

// 사용 예시
processReview(4);
processReview(5);
processReview(3);
