/* eslint-disable no-undef */
import { fireEvent, render, waitFor } from '@testing-library/react';
import React from 'react';
import Items from './Items';

// jest.mock('./SingleItem.js', () => ({
//     __esModule: true,
//     default: () => <div data-testid="mock-singleitem"></div>,
//   }));

describe('Items.js component', () => {
  const mockItems = [
    { id: '1', name: 'Item 1', price: 10, quantity: 2 },
    { id: '2', name: 'Item 2', price: 15, quantity: 1 },
    { id: '3', name: 'Item 3', price: 5, quantity: 4 },
  ];

  const mockIncreaseQuantityHandler = jest.fn();
  const mockDecreaseQuantityHandler = jest.fn();
  const mockRemoveItemHandler = jest.fn();
  it('renders without crashing', () => {
    render(
      <Items
        items={mockItems}
        increaseQuantityHandler={mockIncreaseQuantityHandler}
        decreaseQuantityHandler={mockDecreaseQuantityHandler}
        removeItemHandler={mockRemoveItemHandler}
      />
    );
  });

  it('sorts items by Name', () => {
    const { getAllByTestId, getByLabelText } = render(
      <Items
        items={mockItems}
        increaseQuantityHandler={mockIncreaseQuantityHandler}
        decreaseQuantityHandler={mockDecreaseQuantityHandler}
        removeItemHandler={mockRemoveItemHandler}
      />
    );

    fireEvent.change(getByLabelText('Sort Items By'), { target: { value: 'Name' } });

    const itemElements = getAllByTestId(/item-/);

    expect(itemElements[0]).toHaveTextContent(mockItems[0].name);
    expect(itemElements[1]).toHaveTextContent(mockItems[1].name);
    expect(itemElements[2]).toHaveTextContent(mockItems[2].name);
  });
  it('sorts items by Price', async () => {
    const { getAllByTestId, getByLabelText } = render(
      <Items
        items={mockItems}
        increaseQuantityHandler={mockIncreaseQuantityHandler}
        decreaseQuantityHandler={mockDecreaseQuantityHandler}
        removeItemHandler={mockRemoveItemHandler}
      />
    );

    fireEvent.change(getByLabelText('Sort Items By'), { target: { value: 'price' } });
    await waitFor(() => {
      const itemElements = getAllByTestId(/item-/);

      expect(
        itemElements[0].querySelector('.font-weight-bold').textContent.trim()
      ).toEqual(mockItems[2].name);
      expect(
        itemElements[1].querySelector('.font-weight-bold').textContent.trim()
      ).toEqual(mockItems[0].name);
      expect(
        itemElements[2].querySelector('.font-weight-bold').textContent.trim()
      ).toEqual(mockItems[1].name);
    });
  });

  it('sums all item prices correctly', () => {
    render(
      <Items
        items={mockItems}
        increaseQuantityHandler={mockIncreaseQuantityHandler}
        decreaseQuantityHandler={mockDecreaseQuantityHandler}
        removeItemHandler={mockRemoveItemHandler}
      />
    );

    const sum = mockItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);
    const sumFromComponent = (
      document.querySelector('.total-combined-price').textContent
    );

    const match = sumFromComponent.match(/\d+\.\d{2}/);
    expect(parseFloat(match)).toEqual(sum);
  });
});
