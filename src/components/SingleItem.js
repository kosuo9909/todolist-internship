/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const SingleItem = ({
  keyv2,
  item,
  increaseQuantityHandler,
  removeItemHandler,
  decreaseQuantityHandler,
}) => {
  const [isItemCompleted, setIsItemCompleted] = useState(false);

  return (
    <div key={keyv2}>
      <label className='checkbox'>
        <input
          onClick={() =>
            setIsItemCompleted((prevIsItemCompleted) => !isItemCompleted)
          }
          type='checkbox'
          checked={isItemCompleted}
        ></input>
        <span>Mark as done</span>
      </label>
      <div className='items-row'>
        <div className={`items-entries ${isItemCompleted && 'line-through'}`}>
          Name:<span className='name-span'> {item.name} </span>
          Quantity: <span className='quantity-span'>{item.quantity}</span>
          Price:<span className='price-span'> ${item.price}</span>
          Total Price:
          <span className='total-price-span'>
            {' '}
            ${(item.quantity * item.price).toFixed(2)}
          </span>
        </div>
        <div className='button-wrapper'>
          {!isItemCompleted && (
            <button
              className='button-quantity'
              onClick={() => {
                increaseQuantityHandler(item);
              }}
            >
              Increase Quantity
            </button>
          )}
          {item.quantity > 1 && !isItemCompleted && (
            <button
              className='button-quantity'
              onClick={() => {
                decreaseQuantityHandler(item);
              }}
            >
              Decrease Quantity
            </button>
          )}
          {isItemCompleted && (
            <button
              className='button-quantity'
              onClick={() => {
                removeItemHandler(item);
                setIsItemCompleted(false);
              }}
            >
              Delete Item
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
