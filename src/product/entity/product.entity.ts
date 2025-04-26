import { ProductDto } from "@/product/dtos/product.dto";
import { randomUUID } from "crypto";

export class Product {
  private constructor(readonly input: ProductDto){}

  static create(input: Omit<ProductDto, "id">): Product {
    return new Product({
      ...input,
      id: randomUUID(),
    });
  }

  get data(): ProductDto {
    return this.input;
  }
}
