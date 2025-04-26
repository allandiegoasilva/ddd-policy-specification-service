
import { Cart } from '@/cart/entities/cart.entity';
import { Coupon } from '@/cart/entities/coupon.entity';
import { Customer } from '@/customer/entities/customer.entity';
import { CustomerType } from '@/customer/enums/customer-type.enum';
import { CheckoutService } from '@/payment/checkout.service';
import { Product } from '@/product/entity/product.entity';
import { describe, expect, it } from 'vitest';

describe('CheckoutService', () => {
  it('should apply coupon when customer is eligible', () => {
    const products = [
      Product.create({
        name: 'Product 1',
        price: 100
      }),
      Product.create({
        name: 'Product 2',
        price: 100
      }),
      Product.create({
        name: 'Product 3',
        price: 100
      }),
      Product.create({
        name: 'Product 4',
        price: 100
      })
    ];

    const cart = Cart.create({
      discount: 0,
      products
    });

    const customer = Customer.create({
      name: 'John Doe',
      customerType: CustomerType.GOLD
    });

    const coupon = Coupon.create({
      discount: 10,
      code: '10OFF'
    });

    const checkoutService = new CheckoutService();
    const cartModified = checkoutService.execute(cart, customer, coupon);
    
    expect(cartModified.total).toBe(360);
  });

  it('should not apply coupon when customer is not eligible', () => {
    const products = [
      Product.create({
        name: 'Product 1',
        price: 100
      })
    ];

    const cart = Cart.create({
      discount: 0,
      products
    });

    const customer = Customer.create({
      name: 'John Doe', 
      customerType: CustomerType.NORMAL
    });

    const coupon = Coupon.create({
      discount: 10,
      code: '10OFF'
    });

    const checkoutService = new CheckoutService();
    checkoutService.execute(cart, customer, coupon);

    expect(cart.total).toBe(100);
  });
});
