import { Cart } from "@/cart/entities/cart.entity";
import { ISpecification } from "@/shared/contracts/specification.contract";

export class HasMoreThanItemsSpecification implements ISpecification<Cart> {
  constructor(readonly items: number) {}

  isSatisfiedBy(cart: Cart): boolean {
    return cart.data.products.length > this.items;
  }
}