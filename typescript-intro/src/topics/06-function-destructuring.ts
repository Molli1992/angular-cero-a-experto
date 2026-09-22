interface Product {
  description: string;
  price: number;
}

interface TaxCalculationOptions {
  tax: number;
  products: Product[];
}

const phone: Product = {
  description: "Nokia A1",
  price: 150.0,
};

const tablet: Product = {
  description: "iPad Air",
  price: 250.0,
};

export function taxCalculation(options: TaxCalculationOptions): [number, number] {
  const { products, tax } = options;
  let total: number = 0;

  products.forEach(({ price }) => {
    total += price;
  });

  return [total, total * tax];
}

export const shoppingCart: Product[] = [phone, tablet];
export const tax: number = 0.15;