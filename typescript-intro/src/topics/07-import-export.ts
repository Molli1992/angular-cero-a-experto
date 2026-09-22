import { taxCalculation, tax, shoppingCart } from "./06-function-destructuring";

const [total, taxTotal] = taxCalculation({ tax, products: shoppingCart });

console.log(`Total: ${total}`);
console.log(`Tax: ${taxTotal}`);
