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

    fireEvent.change(getByLabelText('Sort By'), { target: { value: 'Name' } });

    const itemElements = getAllByTestId(/item-/);

    expect(itemElements[0]).toHaveTextContent('Item 1');
    expect(itemElements[1]).toHaveTextContent('Item 2');
    expect(itemElements[2]).toHaveTextContent('Item 3');
    

  });
  it('sorts items by Price', async() => {
    const { getAllByTestId, getByLabelText } = render(
      <Items
        items={mockItems}
        increaseQuantityHandler={mockIncreaseQuantityHandler}
        decreaseQuantityHandler={mockDecreaseQuantityHandler}
        removeItemHandler={mockRemoveItemHandler}
      />
    );

    fireEvent.change(getByLabelText('Sort By'), { target: { value: 'price' } });
    await waitFor(() => {


        const itemElements = getAllByTestId(/item-/);
        
        expect(itemElements[0].querySelector('.name-span').textContent.trim()).toEqual('Item 3');
        expect(itemElements[1].querySelector('.name-span').textContent.trim()).toEqual('Item 1');
        expect(itemElements[2].querySelector('.name-span').textContent.trim()).toEqual('Item 2');
        
    });
    
  });
});
