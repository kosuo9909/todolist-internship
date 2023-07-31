/* eslint-disable no-unused-vars */
import { useState } from "react";
import React from "react";
import './Items.css';
import SingleItem from "./SingleItem";

const RenderItems = ({ items, increaseQuantityHandler, decreaseQuantityHandler, removeItemHandler }) => {
    const [sort, setSort] = useState('')

    const sortedItems = [...items]
    //TODO: funkciq sus switch statement
    if (sort === 'name') {
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'price') {
        sortedItems.sort((a, b) => a.price - b.price)
    }

    const sum = sortedItems.reduce((sum, item) => {
        return sum + (item.price * item.quantity)
    }, 0)

    return <div className="items-header">
        <label className="sort-by" htmlFor='cars'>Sort By
            <select id='cars' onChange={(e) => setSort(e.target.value)}>
                <option value='name'>Name</option>
                <option value='price'>Price</option>
                <option value='default'>Default</option>
            </select>
        </label>
        <div className="items">{sortedItems.map((item, index) => <SingleItem key={index} item={item}
         increaseQuantityHandler={increaseQuantityHandler} 
         removeItemHandler={removeItemHandler}
         decreaseQuantityHandler={decreaseQuantityHandler}/>)}
        </div>
        <div className="total-combined-price-wrap">All items combined amount to <span className="total-combined-price">${sum.toFixed(2)}</span> </div>
    </div>
};

export default RenderItems;