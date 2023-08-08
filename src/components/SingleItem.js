/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const SingleItem = ({
  keyv2,
  item,
  increaseQuantityHandler,
  removeItemHandler,
  decreaseQuantityHandler,
  markAsDoneHandler
}) => {

  return (
    <div data-testid={`item-${item.id}`} key={keyv2}>
      <label className="checkbox">
        <input
          onClick={() => markAsDoneHandler(item)}
          type="checkbox"
          checked={item.checked}
          aria-label={`Mark ${item.name} as ${item.checked ? 'not done' : 'done'}`}
        ></input>
        <span>Mark as {item.checked ? 'not done' : 'done'}</span>
      </label>
      <div className="items-row">
        <div className={`items-entries ${item.checked && 'line-through'}`}>
          Name:
          <span className="name-span">
            {item.name}
          </span>
          Quantity: <span className="quantity-span">{item.quantity}</span>
          Price:<span className="price-span"> ${item.price}</span>
          Total Price:
          <span className="total-price-span">
            {' '}
            ${(item.quantity * item.price).toFixed(2)}
          </span>
        </div>
        <div className="button-wrapper">
          {!item.checked && (
            <button
              className="button-quantity"
              aria-label={`Increase ${item.name} Quantity`}
              onClick={() => {
                increaseQuantityHandler(item);
              }}
            >
              Increase Quantity
            </button>
          )}
          {item.quantity > 1 && !item.checked && (
            <button
              className="button-quantity"
              aria-label={`Decrease ${item.name} Quantity`}
              onClick={() => {
                decreaseQuantityHandler(item);
              }}
            >
              Decrease Quantity
            </button>
          )}
          {item.checked && (
            <button
              className="button-quantity"
              aria-label={`Delete ${item.name} from the list`}

              onClick={() => {
                removeItemHandler(item);
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
