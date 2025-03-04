const users = [
  {
    name: "soye",
    purchases: [
      { item: "smartphone", price: 8000, category: "electronics" },
      { item: "t-shirt", price: 200, category: "clothing" },
      { item: "earbuds", price: 1500, category: "electronics" },
    ],
    hasAgreedToParticipate: true,
  },
  {
    name: "minho",
    purchases: [
      { item: "laptop", price: 12000, category: "electronics" },
      { item: "jeans", price: 550, category: "clothing" },
    ],
    hasAgreedToParticipate: false,
  },
  {
    name: "jiyoung",
    purchases: [
      { item: "tablet", price: 4500, category: "electronics" },
      { item: "sweater", price: 450, category: "clothing" },
      { item: "dress", price: 750, category: "clothing" },
    ],
    hasAgreedToParticipate: true,
  },
  {
    name: "taehyun",
    purchases: [{ item: "smartwatch", price: 2200, category: "electronics" }],
    hasAgreedToParticipate: false,
  },
  {
    name: "sunmi",
    purchases: [
      { item: "headphones", price: 890, category: "electronics" },
      { item: "jacket", price: 980, category: "clothing" },
      { item: "bluetooth speaker", price: 1200, category: "electronics" },
    ],
    hasAgreedToParticipate: true,
  },
  {
    name: "jaehoon",
    purchases: [
      { item: "monitor", price: 3500, category: "electronics" },
      { item: "coat", price: 1500, category: "clothing" },
      { item: "socks", price: 80, category: "clothing" },
    ],
    hasAgreedToParticipate: true,
  },
  {
    name: "yuna",
    purchases: [
      { item: "digital camera", price: 5200, category: "electronics" },
      { item: "scarf", price: 250, category: "clothing" },
    ],
    hasAgreedToParticipate: false,
  },
  {
    name: "dongwoo",
    purchases: [
      { item: "gaming console", price: 4500, category: "electronics" },
      { item: "hoodie", price: 650, category: "clothing" },
      { item: "wireless mouse", price: 450, category: "electronics" },
    ],
    hasAgreedToParticipate: true,
  },
  {
    name: "hyerim",
    purchases: [
      { item: "keyboard", price: 850, category: "electronics" },
      { item: "blouse", price: 420, category: "clothing" },
    ],
    hasAgreedToParticipate: false,
  },
  {
    name: "kyungsoo",
    purchases: [
      { item: "external hard drive", price: 1200, category: "electronics" },
      { item: "shorts", price: 350, category: "clothing" },
      { item: "power bank", price: 600, category: "electronics" },
    ],
    hasAgreedToParticipate: true,
  },
  {
    name: "jiwon",
    purchases: [
      { item: "router", price: 850, category: "electronics" },
      { item: "gloves", price: 180, category: "clothing" },
      { item: "hat", price: 200, category: "clothing" },
    ],
    hasAgreedToParticipate: true,
  },
  {
    name: "seungmin",
    purchases: [
      { item: "printer", price: 2800, category: "electronics" },
      { item: "pajamas", price: 480, category: "clothing" },
    ],
    hasAgreedToParticipate: false,
  },
  {
    name: "jihye",
    purchases: [
      { item: "microwave", price: 3200, category: "electronics" },
      { item: "shoes", price: 650, category: "clothing" },
      { item: "fitness tracker", price: 950, category: "electronics" },
    ],
    hasAgreedToParticipate: true,
  },
  {
    name: "woojin",
    purchases: [
      { item: "television", price: 9500, category: "electronics" },
      { item: "belt", price: 280, category: "clothing" },
    ],
    hasAgreedToParticipate: false,
  },
  {
    name: "eunbi",
    purchases: [
      { item: "vacuum cleaner", price: 4200, category: "electronics" },
      { item: "cardigan", price: 550, category: "clothing" },
      { item: "air purifier", price: 3800, category: "electronics" },
    ],
    hasAgreedToParticipate: true,
  },
];

// 특정 분야의 총 구매 금액 기준 구매왕을 정해야합니다.

const getPurchaseWinner = () => {
  const eventParticipants = [];
  const electronicsGroup = [];
  const clothingGroup = [];

  // 이벤트 참가자 추출
  for (let i = 0; i < users.length; i++) {
    if (users[i].hasAgreedToParticipate) {
      eventParticipants.push(users[i]);
    }
  }

  // 전자제품 구매자 그룹 및 총 구매 가격 추출
  for (let i = 0; i < eventParticipants.length; i++) {
    const user = {
      name: eventParticipants[i].name,
      totalExpenditure: 0,
    };

    for (let j = 0; j < eventParticipants[i].purchases.length; j++) {
      if (eventParticipants[i].purchases[j].category === "electronics") {
        user.totalExpenditure += eventParticipants[i].purchases[j].price;
      }
    }

    electronicsGroup.push(user);
  }

  // 의류 구매자 그룹 및 총 구매 가격 추출
  for (let i = 0; i < eventParticipants.length; i++) {
    const user = {
      name: eventParticipants[i].name,
      totalExpenditure: 0,
    };

    for (let j = 0; j < eventParticipants[i].purchases.length; j++) {
      if (eventParticipants[i].purchases[j].category === "clothing") {
        user.totalExpenditure += eventParticipants[i].purchases[j].price;
      }
    }

    clothingGroup.push(user);
  }

  const electronicsWinner = () => {
    let winner = [electronicsGroup[0]];
    for (let i = 1; i < electronicsGroup.length; i++) {
      if (electronicsGroup[i].totalExpenditure > winner[0].totalExpenditure) {
        winner = [electronicsGroup[i]];
      } else if (
        electronicsGroup[i].totalExpenditure === winner.totalExpenditure
      ) {
        winner.push(electronicsGroup[i]);
      }
    }

    return winner;
  };

  const clothingWinner = () => {
    let winner = [clothingGroup[0]];
    for (let i = 1; i < clothingGroup.length; i++) {
      if (clothingGroup[i].totalExpenditure > winner[0].totalExpenditure) {
        winner = [clothingGroup[i]];
      } else if (
        clothingGroup[i].totalExpenditure === winner.totalExpenditure
      ) {
        winner.push(clothingGroup[i]);
      }
    }

    return winner;
  };

  return {
    eletronicsWinner: electronicsWinner(),
    clothingWinner: clothingWinner(),
  };
};

getPurchaseWinner();

export default {};
