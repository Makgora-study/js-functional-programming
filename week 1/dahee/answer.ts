//레니님 문제
let totalScore = 0;
let reviewCount = 0;

function processReview(score: number): void {
	totalScore += score;
	reviewCount++;
	updateReviewDisplay();
}

function updateReviewDisplay(): void {
	const average = getAverage(totalScore, reviewCount);
	logAverageReviewScore(average)
}
function getAverage(total: number, count: number): number {
	return total / count;
}

function logAverageReviewScore(average: number): void {
	console.log(`현재 평균 리뷰 점수: ${average.toFixed(2)}`);
}
// 사용 예시
processReview(4);
processReview(5);
processReview(3);


//소예님 문제
type UserType = {
    name: string;
    job: string;
    employHistory: number;
  };
  
  const users = [
    { name: "soye", job: "none", employHistory: 6 },
    { name: "woori", job: "developer", employHistory: 120 },
    { name: "gaeddong", job: "poo", employHistory: 0 },
    { name: "dahee", job: "developer", employHistory: 24 },
    { name: "gabae", job: "developer", employHistory: 36 },
    { name: "yeso", job: "casher", employHistory: 80 },
    { name: "dev-god", job: "developer", employHistory: 240 },
  ];
  
  const excludeBaeksoo = ()=>{
      throw new Error(
        "직업이 없는 사람은 그냥 백수입니다... 실업통계로 계산해주세요"
      );
    
  }
  
  const getEmployHistory = (users, job) =>{
      return users.reduce((ac, cur)=>{
          if(cur.job === job){
              return ac += cur.employHistory
          }
      },0)
  
  }
  
  
  const evaluateSector = (users: UserType[], job: string) => {
    if (job !== "none") {
        const averageStandard = 60;
        const sum =  getEmployHistory(users, job)
        const average = Math.ceil(
          sum / users.filter((user: UserType) => user.job === job).length
        );
        //쪼개기
            if (average > averageStandard) {
              console.log(`${average}개월이라니 이 분야는 평균 경력이 높구만`);
            } else {
              console.log(`${average}개월이라니 이 분야는 신생인가?`);
            }
    } else {
      excludeBaeksoo()
    }
  };
  
  evaluateSector(users, "none");
  
  export {};