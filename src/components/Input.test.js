/* eslint-disable no-undef */
import { fireEvent, render } from '@testing-library/react';
import Input from './Input';
import { describe, it, jest } from '@jest/globals';
import React from 'react';

jest.mock('uuid', () => ({
  v4: () => '1',
}));

describe('Input Component', () => {
  it('renders without crashing', () => {
    const mockAddItemHandler = jest.fn();
    render(<Input addItemHandler={mockAddItemHandler} />);
  });

  it('handles user input for name and price', () => {
    const mockAddItemHandler = jest.fn();
    const { getByPlaceholderText } = render(
      <Input addItemHandler={mockAddItemHandler} />
    );
    const nameInput = getByPlaceholderText('Item Name');
    const priceInput = getByPlaceholderText('Item Price');

    fireEvent.change(nameInput, { target: { value: 'Test Item' } });
    fireEvent.change(priceInput, { target: { value: '10' } });

    expect(nameInput.value).toBe('Test Item');
    expect(priceInput.value).toBe('10');
  });

  it('calls addItemHandler function on button click', () => {
    const mockAddItemHandler = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <Input addItemHandler={mockAddItemHandler} />
    );
    const nameInput = getByPlaceholderText('Item Name');
    const priceInput = getByPlaceholderText('Item Price');
    const addButton = getByText(/Add Item/i);

    fireEvent.change(nameInput, { target: { value: 'Test Item' } });
    fireEvent.change(priceInput, { target: { value: '10' } });

    fireEvent.click(addButton);

    expect(mockAddItemHandler).toHaveBeenCalledWith({
      name: 'Test Item',
      price: '10',
      quantity: 1,
      id: '1',
    });
  });

  it('calls addItemHandler function on button click and clears input', () => {
    const mockAddItemHandler = jest.fn();

    const { getByPlaceholderText, getByText } = render(
      <Input addItemHandler={mockAddItemHandler} />
    );
    const nameInput = getByPlaceholderText('Item Name');
    const priceInput = getByPlaceholderText('Item Price');
    const addButton = getByText(/Add Item/i);

    fireEvent.change(nameInput, { target: { value: 'Test Item' } });
    fireEvent.change(priceInput, { target: { value: '10' } });

    fireEvent.click(addButton);

    expect(mockAddItemHandler).toHaveBeenCalledWith({
      name: 'Test Item',
      price: '10',
      quantity: 1,
      id: '1',
    });

    expect(priceInput.value).toBe('');
    expect(nameInput.value).toBe('');
  });

  it('calls addItemAndClearInput when Enter is pressed', () => {

    const mockAddItemHandler = jest.fn();

    const { getByPlaceholderText } = render(
      <Input addItemHandler={mockAddItemHandler} />
    );
    const nameInput = getByPlaceholderText('Item Name');
    const priceInput = getByPlaceholderText('Item Price');

    fireEvent.change(nameInput, { target: { value: 'Test Item' } });
    fireEvent.change(priceInput, { target: { value: '10' } });

    fireEvent.keyDown(nameInput, {code: 'Enter'});


    expect(mockAddItemHandler).toHaveBeenCalledWith({
      name: 'Test Item',
      price: '10',
      quantity: 1,
      id: '1',
    });

    expect(mockAddItemHandler).toHaveBeenCalledTimes(1);
  });

  it('calls addItemAndClearInput when NumpadEnter is pressed', () => {

    const mockAddItemHandler = jest.fn();

    const { getByPlaceholderText } = render(
      <Input addItemHandler={mockAddItemHandler} />
    );
    const nameInput = getByPlaceholderText('Item Name');
    const priceInput = getByPlaceholderText('Item Price');

    fireEvent.change(nameInput, { target: { value: 'Test Item' } });
    fireEvent.change(priceInput, { target: { value: '10' } });

    fireEvent.keyDown(nameInput, {code: 'NumpadEnter'});


    expect(mockAddItemHandler).toHaveBeenCalledWith({
      name: 'Test Item',
      price: '10',
      quantity: 1,
      id: '1',
    });

    expect(mockAddItemHandler).toHaveBeenCalledTimes(1);
  });

  
});
