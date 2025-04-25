import { CustomerDto } from "@/customer/dtos/customer.dto";
import { randomBytes } from "crypto";

export class Customer {
  private constructor(readonly props: CustomerDto){}

  static create(input: Omit<CustomerDto, 'id'>): Customer {
    return new Customer({
      ...input,
      id: randomBytes(16).toString('hex'),
    });
  }

  get data(): CustomerDto {
    return this.props;
  }
}