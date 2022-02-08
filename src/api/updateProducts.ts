import { Product } from "../models/products"

export default async function updateProducts(products: Product[]) {
    await fetch('http://localhost:4000/products', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(products)
    })
}