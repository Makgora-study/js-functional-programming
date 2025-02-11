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

const evaluateSector = (users: UserType[], job: string) => {
  const averageStandard = 60;
  let sum = 0;

  if (job !== "none") {
    for (let i = 0; i < users.length; i++) {
      if (users[i].job === job) {
        sum += users[i].employHistory;
      }
    }
  } else {
    throw new Error(
      "직업이 없는 사람은 그냥 백수입니다... 실업통계로 계산해주세요"
    );
  }

  const average = Math.ceil(
    sum / users.filter((user: UserType) => user.job === job).length
  );

  if (average > averageStandard) {
    console.log(`${average}개월이라니 이 분야는 평균 경력이 높구만`);
  } else {
    console.log(`${average}개월이라니 이 분야는 신생인가?`);
  }
};

evaluateSector(users, "none");

export {};
