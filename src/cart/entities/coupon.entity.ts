import { CouponDto } from "@/cart/dtos/coupon.dto";
import { randomBytes } from "crypto";


export class Coupon {
  private constructor(readonly props: CouponDto) {}

  static create(input: Omit<CouponDto, 'id'>): Coupon {
    return new Coupon({
      ...input,
      id: randomBytes(16).toString('hex'),
    });
  }

  get data(): CouponDto {
    return this.props;
  }

  calculateDiscount(price: number): number {
    return price * (this.props.discount / 100);
  }
}
