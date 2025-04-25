import { Customer } from "@/customer/entities/customer.entity";
import { CustomerType } from "@/customer/enums/customer-type.enum";
import { ISpecification } from "@/shared/contracts/specification.contract";

export class CustomerIsGoldSpecification implements ISpecification<Customer> {
  
  isSatisfiedBy(customer: Customer): boolean {
    return customer.data.customerType === CustomerType.GOLD;
  }
}