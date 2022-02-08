import { Product } from "../../models/products";
import updateSelectedProduct from "./updateSelectedProduct";

const PRODUCT: Omit<Product, "selected"> = {
    id: '1',
    name: 'Product 1',
    imageUrl: 'image'
}

describe('updateSelectedProduct', () => {
    it('should select product when product is NOT already selected', () => {
        const products: Product[] = [{ ...PRODUCT, selected: false }]
        const selectedProductId = '1';

        const updatedProducts = updateSelectedProduct(products, selectedProductId)
        expect(updatedProducts).toEqual([{ ...PRODUCT, selected: true }])
    });

    it('should unselect product when product is already selected', () => {
        const products: Product[] = [{ ...PRODUCT, selected: true }]
        const selectedProductId = '1';

        const updatedProducts = updateSelectedProduct(products, selectedProductId)
        expect(updatedProducts).toEqual([{ ...PRODUCT, selected: false }])
    });
});