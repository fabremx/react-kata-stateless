import { Product } from '../../models/products';
import './ProductItem.scss';

interface Props {
  product: Product
  selectProduct: (selectedProductId: string) => void
}

function ProductItem({ product, selectProduct }: Props) {
  const productSelectedClass = (product: Product) => {
    return product.selected ? "product-item--selected" : "";
  }

  return (
    <div className={`product-item ${productSelectedClass(product)}`} onClick={() => selectProduct(product.id)} data-testid='product-item'>
      <div className="product-item__image">
        <img src={product.imageUrl} alt={product.name} />
      </div>

      <p><span className="product-item__key">Name: </span>{product.name}</p>
    </div>
  );
}

export default ProductItem;
