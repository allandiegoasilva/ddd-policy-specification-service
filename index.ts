import { Product } from "./src/entities/product.entity";
import { ProductExpensiveSpecification } from "./src/specifications/product/product-expensive.specification";




const product = Product.create({ title: 'Product 1', price: 100 });

const expensiveSpecification = new ProductExpensiveSpecification(100);

console.log(expensiveSpecification.isSatisfiedBy(product) ? "MUITO CARO" : "barato");

