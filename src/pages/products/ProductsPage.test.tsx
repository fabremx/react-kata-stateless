import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ApiModule from '../../api';
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
    jest.spyOn(ApiModule, 'getProducts').mockResolvedValue([
      { id: '1', name: 'Bio Banana', imageUrl: 'https://i.postimg.cc/mPRtc92k/bananes.jpg', selected: false },
      { id: '2', name: 'Zucchini', imageUrl: 'https://i.postimg.cc/VSZ6HH90/courgettes.jpg', selected: false },
      { id: '3', name: 'Oranges', imageUrl: 'https://i.postimg.cc/ph9TNYkG/orange.jpg', selected: false },
      { id: '4', name: 'Tomatoes', imageUrl: 'https://i.postimg.cc/76RXzP0D/tomate.jpg', selected: false }
    ])

    jest.spyOn(ApiModule, 'updateProducts').mockResolvedValue()
  })

  it('should select a product when user click on it', async () => {
    render(<ProductsPage />)

    await clickOnProductItem(ORANGES_TEXT_NAME);

    const orangesProductItem = await findProductItem(PRODUCT_LIST_ORDER.ORANGES)
    await waitFor(async () => {
      expect(orangesProductItem).toHaveClass('product-item--selected')
    });
  });

  it('should display a product as selected when user click on it', async () => {
    render(<ProductsPage />)

    await clickOnProductItem(ORANGES_TEXT_NAME);
    await clickOnProductItem(ORANGES_TEXT_NAME);

    const orangesProductItem = await findProductItem(PRODUCT_LIST_ORDER.ORANGES)
    await waitFor(() => {
      expect(orangesProductItem).not.toHaveClass('product-item--selected')
    });
  });

  it('should display "selected: YES" for one product when user click on it', async () => {
    render(<ProductsPage />)

    await clickOnProductItem(ORANGES_TEXT_NAME);

    await waitFor(async () => {
      const orangesSummary = await findProductSummary(PRODUCT_LIST_ORDER.ORANGES)
      expect(orangesSummary).toHaveTextContent('Selected: YES')
    });
  });

  it('should display "selected: NO" for one product when user click on it twice', async () => {
    render(<ProductsPage />)

    await clickOnProductItem(ORANGES_TEXT_NAME);
    await clickOnProductItem(ORANGES_TEXT_NAME);

    const orangesSummary = await findProductSummary(PRODUCT_LIST_ORDER.ORANGES)
    await waitFor(() => {
      expect(orangesSummary).toHaveTextContent('Selected: NO')
    });
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
