import { Cart } from "@/cart/entities/cart.entity";
import { HasMoreThanItemsSpecification } from "@/cart/specifications/has-more-than-items.specification";
import { Customer } from "@/customer/entities/customer.entity";
import { CustomerIsGoldSpecification } from "@/customer/specifications/customer-is-gold.specification";
import { ISpecification } from "@/shared/contracts/specification.contract";

type Input = {
  cart: Cart;
  customer: Customer;
}

export class CannotApplyCouponSpecification implements ISpecification<Input> {
  isSatisfiedBy(input: Input): boolean {
    const { cart, customer } = input;

    const hasMoreThanItems = new HasMoreThanItemsSpecification(1);
    const customerIsGold = new CustomerIsGoldSpecification();

    return hasMoreThanItems.isSatisfiedBy(cart) && customerIsGold.isSatisfiedBy(customer);
  }
}