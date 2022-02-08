import { Product } from '../../models/products';
import './ProductSummary.scss';

interface Props {
  products: Product[]
}

function ProductSummary({ products }: Props) {
  const productSelectedClass = (isProductSelected: boolean) => {
    return isProductSelected
      ? "product-summary__text--green"
      : "product-summary__text--red"
  }

  return (
    <div className="product-summary">
      <h3 className="product-summary__title">Summary</h3>

      <div className="product-summary__wrapper">
        {products?.map((product: Product) => (
          <div className="product-summary__info" key={product.id} data-testid="summary-info">
            <p className="product-summary__text">
              <span className="product-summary__text--bold">Name: </span>
              {product.name}
            </p>

            <p className="product-summary__text">
              <span className="product-summary__text--bold">Selected: </span>
              <span className={productSelectedClass(product.selected)}>{product.selected ? 'YES' : 'NO'}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductSummary;
