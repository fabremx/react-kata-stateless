import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ProductsPage from './ProductsPage';

enum COMPONENT_ELEMENT {
  PRODUCT_LIST_ELEMENT,
  SUMMARY_ELEMENT
};

enum PRODUCT_LIST_ORDER {
  BANANA,
  ZUCHINI,
  ORANGES,
  TOMATOES
};

const ORANGES_TEXT_NAME = 'Oranges';

describe('Products Page Component', () => {
  beforeEach(() => {
    removeCookie('products')
  })

  it('should select a product when user click on it', async () => {
    render(<ProductsPage />)

    await clickOnProductItem(ORANGES_TEXT_NAME);

    const orangesProductItem = await findProductItem(PRODUCT_LIST_ORDER.ORANGES)
    expect(orangesProductItem).toHaveClass('product-item--selected')
  });

  it('should display a product as selected when user click on it', async () => {
    render(<ProductsPage />)

    await clickOnProductItem(ORANGES_TEXT_NAME);
    await clickOnProductItem(ORANGES_TEXT_NAME);

    const orangesProductItem = await findProductItem(PRODUCT_LIST_ORDER.ORANGES)
    expect(orangesProductItem).not.toHaveClass('product-item--selected')
  });

  it('should display "selected: YES" for one product when user click on it', async () => {
    render(<ProductsPage />)

    await clickOnProductItem(ORANGES_TEXT_NAME);

    const orangesSummary = await findProductSummary(PRODUCT_LIST_ORDER.ORANGES)
    expect(orangesSummary).toHaveTextContent('Selected: YES')
  });

  it('should display "selected: NO" for one product when user click on it twice', async () => {
    render(<ProductsPage />)

    await clickOnProductItem(ORANGES_TEXT_NAME);
    await clickOnProductItem(ORANGES_TEXT_NAME);

    const orangesSummary = await findProductSummary(PRODUCT_LIST_ORDER.ORANGES)
    expect(orangesSummary).toHaveTextContent('Selected: NO')
  });
});

async function clickOnProductItem(productName: string) {
  const elements = await screen.findAllByText(productName)
  userEvent.click(elements[COMPONENT_ELEMENT.PRODUCT_LIST_ELEMENT])
}

async function findProductItem(productPosition: PRODUCT_LIST_ORDER): Promise<HTMLElement> {
  const elements = await screen.findAllByTestId('product-item');
  return elements[productPosition]
}

async function findProductSummary(productPosition: PRODUCT_LIST_ORDER): Promise<HTMLElement> {
  const summaryTexts = await screen.findAllByTestId('summary-info');
  return summaryTexts[productPosition]
}

function removeCookie(name: string) {
  document.cookie = `${name}=1; expires=1 Jan 1970 00:00:00 GMT;`
}
