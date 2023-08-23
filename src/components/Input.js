import { useState } from 'react';
import React from 'react';
import './Input.css';
import { v4 } from 'uuid';

const Input = ({ addItemHandler }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  const handleEnterAddItem = (e) => {
    if (e.code === 'NumpadEnter' || e.code === 'Enter') {
      addItemAndClearInput();
    }
  };
  const addItemAndClearInput = () => {
    addItemHandler({ name, price, quantity: 1, checked: false, id: v4() });
    setName('');
    setPrice('');
  };
  return (
    <div className='input-header'>
      <input
        value={name}
        placeholder='Item Name'
        onKeyDown={handleEnterAddItem}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <input
        value={price}
        placeholder='Item Price'
        onKeyDown={handleEnterAddItem}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      ></input>
      <button onClick={addItemAndClearInput}>Add Item</button>
    </div>
  );
};

export default Input;
