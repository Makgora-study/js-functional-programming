type UserType = {
  name: string;
  job: string;
  employHistory: number;
};

// 데이터
const users = [
  { name: "soye", job: "none", employHistory: 6 },
  { name: "woori", job: "developer", employHistory: 120 },
  { name: "gaeddong", job: "poo", employHistory: 0 },
  { name: "dahee", job: "developer", employHistory: 24 },
  { name: "gabae", job: "developer", employHistory: 36 },
  { name: "yeso", job: "casher", employHistory: 80 },
  { name: "dev-god", job: "developer", employHistory: 240 },
];

// 계산
const getEmployHistoryAverage = (users: UserType[], job: string): number => {
  if (job === "none") {
    throw new Error(
      "직업이 없는 사람은 그냥 백수입니다... 실업통계로 계산해주세요"
    );
  }

  const SameJobUsers = users.filter((user: UserType) => user.job === job);

  const totalEmployHistory = SameJobUsers.reduce(
    (acc: number, user: UserType) => acc + user.employHistory,
    0
  );

  return Math.ceil(totalEmployHistory / SameJobUsers.length);
};

// 계산 결과
const employHistoryAverage = getEmployHistoryAverage(users, "developer");

// 액션
const evaluateSector = (average: number, monthlyAverageStandard: number) => {
  if (average > monthlyAverageStandard)
    console.log(`${average}개월이라니 이 분야는 평균 경력이 높구만`);
  else console.log(`${average}개월이라니 이 분야는 신생인가?`);
};

evaluateSector(employHistoryAverage, 60);

export {};
