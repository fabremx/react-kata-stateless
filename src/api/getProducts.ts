import { Product } from "../models/products"

export default async function getProducts(): Promise<Product[]> {
    const response = await fetch('http://localhost:4000/products', {
        method: 'GET'
    });

    const products = await response.json()
    return products
};
