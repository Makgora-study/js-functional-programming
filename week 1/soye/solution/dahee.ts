interface OrderType {
  item: string;
  price: number;
  quantity: number;
}

const orders: OrderType[] = [
  { item: "Laptop", price: 1000, quantity: 2 },
  { item: "Mouse", price: 25, quantity: 3 },
  { item: "Keyboard", price: 50, quantity: 1 },
];

//들어온 주문에 대한 총 합을 구하는 calculateTotalPrices 함수 만들기

const calculateTotalPrices = (orders: OrderType[]) =>
  orders.reduce((total, { price, quantity }) => total + price * quantity, 0);

calculateTotalPrices(orders);

export default {};
