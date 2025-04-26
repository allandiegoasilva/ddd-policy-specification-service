import { CartDto } from "@/cart/dtos/cart.dto";
import { Coupon } from "@/cart/entities/coupon.entity";
import { randomBytes } from "crypto";

export class Cart {
  private constructor(private props: CartDto) {}

  static create(input: Omit<CartDto, 'id'>): Cart {
    return new Cart({
      ...input,
      id: randomBytes(16).toString('hex'),
    });
  }

  get data(): CartDto {
    return this.props;
  }

  get total(): number {
    const total = this.props.products.reduce((acc, product) => acc + product.data.price, 0);
   
    return total - this.props.discount;
  }

  applyCoupon(coupon: Coupon) {
    this.props.discount = coupon.calculateDiscount(this.total);
  }
}
