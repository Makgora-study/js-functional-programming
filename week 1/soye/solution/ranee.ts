type DataType = {
  totalScore: number;
  reviewCount: number;
};

let data: DataType = {
  totalScore: 0,
  reviewCount: 0,
};

const dataStack = (score: number, data: DataType): DataType => {
  return {
    totalScore: data.totalScore + score,
    reviewCount: data.reviewCount + 1,
  };
};

const calculateAverage = (data: DataType): number => {
  return data.totalScore / data.reviewCount;
};

const renderScoreAverage = (average: number): void => {
  console.log(`현재 평균 리뷰 점수: ${average.toFixed(2)}`);
};

const processReview = (score: number, data: DataType): DataType => {
  const newData = dataStack(score, data);
  const average = calculateAverage(newData);
  renderScoreAverage(average);

  return newData;
};

data = processReview(4, data);
data = processReview(5, data);
data = processReview(3, data);

export default {};
