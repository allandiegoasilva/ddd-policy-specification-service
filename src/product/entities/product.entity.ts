import { randomBytes } from "crypto";


export type ProductDto = {
    id: string;
    title: string;
    price: number;
}

export class Product {
    private constructor(readonly props: ProductDto){}

    static create(input: Omit<ProductDto, 'id'>): Product {
        return new Product({
            ...input,
            id: randomBytes(16).toString('hex'),
        });
    }

    get data(): ProductDto {
        return this.props;
    }
}