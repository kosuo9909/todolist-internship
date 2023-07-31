import { useState } from "react";
import React from "react";

const RenderItems = ({ items, increaseQuantityHandler, decreaseQuantityHandler, removeItemHandler }) => {
    const [sort, setSort] = useState('')

    const sortedItems = [...items]

    if (sort === 'name') {
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'price') {
        sortedItems.sort((a, b) => a.price - b.price)
    }

    const sum = sortedItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity)
    }, 0)

    return <div>
        <label htmlFor='cars'>Sort By</label>
        <select id='cars' onChange={(e) => setSort(e.target.value)}>
            <option value='name'>Name</option>
            <option value='price'>Price</option>
            <option value='default'>Default</option>
        </select>
        {sortedItems.map((item, index) => (<div key={index} >
            <p>Name: {item.name} Quantity: {item.quantity} Price: ${item.price} Total Price: ${item.quantity * item.price}
                <button onClick={() => { increaseQuantityHandler(item) }}>Increase Quantity</button>
                {item.quantity > 1 && <button onClick={() => { decreaseQuantityHandler(item) }}>Decrease Quantity</button>}
                <button onClick={() => { removeItemHandler(item) }}>Delete Item</button>
            </p>
        </div>))}
        <span>All items combined amount to ${sum}</span>
    </div>
};

export default RenderItems;