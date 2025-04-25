import { ISpecification } from "../contracts/specification.contract";

export class OrSpecification<T> implements ISpecification<T> {
  constructor(private readonly specifications: ISpecification<T>[]) {}

  isSatisfiedBy(entity: T): boolean {
    return this.specifications.some((specification) => specification.isSatisfiedBy(entity));
  }
}