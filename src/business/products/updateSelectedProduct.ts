import { Product } from "../../models/products";

const updateSelectedProduct = (products: Product[], selectedProductId: string): Product[] => {
    return products.map((product: Product) => ({
        ...product,
        selected: product.id === selectedProductId
            ? !product.selected
            : product.selected
    }))
}

export default updateSelectedProduct