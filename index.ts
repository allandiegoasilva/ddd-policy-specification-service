import { Cart } from "@/cart/entities/cart.entity";
import { Coupon } from "@/cart/entities/coupon.entity";
import { Customer } from "@/customer/entities/customer.entity";
import { CustomerType } from "@/customer/enums/customer-type.enum";
import { CheckoutService } from "@/payment/checkout.service";
import { Product } from "@/product/entity/product.entity";



const products = Array.from({ length: 3 }, (_, index) => Product.create({
  name: `Product ${index + 1}`,
  price: (index + 1)* 100,
}));


const cart = Cart.create({
  discount: 0,
  products,
});

const customer1 = Customer.create({
  name: "John Doe",
  customerType: CustomerType.GOLD
});

const customer2 = Customer.create({
  name: "Jane Doe",
  customerType: CustomerType.NORMAL
});

const coupon = Coupon.create({
  discount: 10,
  code: "10% off",
});

const paymentServiceWithoutValidCoupon = new CheckoutService();
paymentServiceWithoutValidCoupon.execute(cart, customer1, coupon);



