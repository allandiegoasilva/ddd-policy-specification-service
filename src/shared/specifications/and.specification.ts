import { ISpecification } from "../contracts/specification.contract";

export class AndSpecification<T> implements ISpecification<T> {
  constructor(private readonly specifications: ISpecification<T>[]) {}

  isSatisfiedBy(entity: T): boolean {
    return this.specifications.every((specification) => specification.isSatisfiedBy(entity));
  }
}