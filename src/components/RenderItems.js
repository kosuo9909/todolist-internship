import { useState } from "react";

const RenderItems = ({ items, increaseQuantityHandler,decreaseQuantityHandler }) => {
    const [sort, setSort] = useState('')

    const sortedItems = [...items]

    if (sort === 'name') {
        sortedItems.sort((a, b) => { return a.name.localeCompare(b.name) });
    } else if (sort === 'price') {
        sortedItems.sort((a, b) => a.price - b.price)
    }

    return <div>
        <label htmlFor='cars'>Sort By</label>
        <select id='cars' onChange={(e) => setSort(e.target.value)}>
            <option value='name'>Name</option>
            <option value='price'>Price</option>
        </select>
        {sortedItems.map((item, index) => (<div key={index} >
            <p>Name: {item.name} Quantity: {item.quantity} Price: ${item.price} Total Price: ${item.quantity * item.price} 
            <button onClick={() => {increaseQuantityHandler(item)}}>Increase Quantity</button>
            {item.quantity > 1 && <button onClick={() => {decreaseQuantityHandler(item)}}>Decrease Quantity</button>}
            </p>
        </div>))}
    </div>
};

export default RenderItems;