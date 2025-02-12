const reviews: number[] = [4, 5, 3];

function addReview(reviews: number[], score: number): number[] {
	return [...reviews, score];
}

function calculateAverage(reviews: number[]): number {
	const totalScore = reviews.reduce((acc, curr) => acc + curr, 0);
	const reviewCount = reviews.length;

	return totalScore / reviewCount;
}

const updatedReviews = addReview(reviews, 5);
const avgScore = calculateAverage(updatedReviews);

console.log(`현재 평균 리뷰 점수: ${avgScore.toFixed(2)}`);
