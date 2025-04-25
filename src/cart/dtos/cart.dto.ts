export type CartDto = {
  id: string;
  products: {name: string, price: number}[];
  discount: number;
}