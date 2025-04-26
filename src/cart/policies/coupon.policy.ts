import { Cart } from "@/cart/entities/cart.entity";
import { HasMoreThanItemsSpecification } from "@/cart/specifications/has-more-than-items.specification";
import { Customer } from "@/customer/entities/customer.entity";
import { CustomerIsGoldSpecification } from "@/customer/specifications/customer-is-gold.specification";

export class CouponPolicy {
 
  canApplyCoupon(customer: Customer, cart: Cart): boolean {
    const isGoldCustomer = new CustomerIsGoldSpecification().isSatisfiedBy(customer);
    const hasMoreThanThreeItems = new HasMoreThanItemsSpecification(3).isSatisfiedBy(cart);

    console.log(isGoldCustomer, hasMoreThanThreeItems);
    return isGoldCustomer && hasMoreThanThreeItems;
  }
}