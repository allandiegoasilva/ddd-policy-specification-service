import { CustomerType } from "../enums/customer-type.enum";

export type CustomerDto = {
  id: string;
  name: string;
  customerType: CustomerType;
}
