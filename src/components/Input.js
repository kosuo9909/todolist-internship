import { useState } from "react";

const Input = ({addItemHandler}) => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const addItemAndClearInput = ( ) => {
        addItemHandler({name, price, quantity: 1})
        setName('')
        setPrice('')
    }
    return <div>
        <input value={name} placeholder="Item Name" onChange={(e) => {setName(e.target.value)}}></input>
        <input value={price} placeholder="Item Price" onChange={(e) => {setPrice(e.target.value)}}></input>
        <button onClick={addItemAndClearInput}>Add Item</button>
    </div>
}

export default Input;