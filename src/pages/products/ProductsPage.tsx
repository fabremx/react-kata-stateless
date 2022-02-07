import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import ProductList from '../../components/product-list/ProductList';
import ProductSummary from '../../components/product-summary/ProductSummary';
import { Product } from '../../models/products';
import { FAKE_PRODUCTS } from '../../__mocks__/products';

function ProductsPage() {
  const [cookies, setCookie] = useCookies(['products']);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (cookies['products']) {
      setProducts(cookies['products'])
      return;
    }

    setProducts(FAKE_PRODUCTS);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateProducts = (products: Product[]) => {
    setProducts(products)
    setCookie('products', products, { path: '/', maxAge: 31536000 })
  }

  return (
    <div className="products">
      <ProductList products={products} updateProducts={updateProducts} />
      <ProductSummary />
    </div>
  );
}

export default ProductsPage;
