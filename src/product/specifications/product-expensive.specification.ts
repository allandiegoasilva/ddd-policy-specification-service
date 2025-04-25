// Simple Specification

import { ISpecification } from "../../shared/contracts/specification.contract";
import { Product } from "../../entities/product.entity";

export class ProductExpensiveSpecification implements ISpecification<Product> {
  constructor(readonly price: number){}

  isSatisfiedBy(product: Product): boolean {
    return product.data.price > this.price;
  }
}

