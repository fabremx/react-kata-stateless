import { useEffect, useState } from 'react';
import ApiModule from '../../api';
import ProductList from '../../components/product-list/ProductList';
import ProductSummary from '../../components/product-summary/ProductSummary';
import { Product } from '../../models/products';

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const products: Product[] = await ApiModule.getProducts()
      setProducts(products)
    })()
  }, [])

  const updateProducts = async (products: Product[]) => {
    await ApiModule.updateProducts(products);
    setProducts(products)
  }

  return (
    <div className="products">
      <ProductList products={products} updateProducts={updateProducts} />
      <ProductSummary products={products} />
    </div>
  );
}

export default ProductsPage;
