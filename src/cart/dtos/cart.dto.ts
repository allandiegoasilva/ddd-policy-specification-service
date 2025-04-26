import { Product } from "@/product/entity/product.entity";

export type CartDto = {
  id: string;
  products: Product[];
  discount: number;
}