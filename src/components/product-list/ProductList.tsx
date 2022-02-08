import BusinessModule from '../../business';
import { Product } from '../../models/products';
import ProductItem from '../product-item/ProductItem';
import './ProductList.scss';

interface Props {
  products: Product[]
  updateProducts: (products: Product[]) => void
}

function ProductList({ products, updateProducts }: Props) {
  const toggleSelectProduct = (productId: string) => {
    const selectedProducts = BusinessModule.updateSelectedProduct(products, productId);
    updateProducts(selectedProducts);
  }

  return (
    <>
      <h3 className="product-title">Products List</h3>

      <div className="product-list">
        {products.map((product: Product) => (
          <ProductItem product={product} selectProduct={toggleSelectProduct} key={product.id} />
        ))}
      </div>
    </>
  );
}

export default ProductList;
