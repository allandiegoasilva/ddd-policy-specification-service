import { Cart } from "@/cart/entities/cart.entity";
import { Coupon } from "@/cart/entities/coupon.entity";
import { CouponPolicy } from "@/cart/policies/coupon.policy";
import { Customer } from "@/customer/entities/customer.entity";

export class CheckoutService {

  execute(cart: Cart, customer: Customer, coupon: Coupon) {
    const policy = new CouponPolicy();
    const canApplyCoupon = policy.canApplyCoupon(customer, cart);

    if (canApplyCoupon) {
      cart.applyCoupon(coupon);
    }

    return cart;
  }
}