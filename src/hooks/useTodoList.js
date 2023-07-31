/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";

const useTodoList = (storageType) => {

    const [items, setItems] = useState(JSON.parse(localStorage.getItem("items")) || []);

    const addItemHandler = (newItem) => {
        setItems(prevItems => [...prevItems, newItem]);
    }

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items))
    }, [items])

    const increaseQuantityHandler = (itemToBeFound) => {
        const updatedItems = items.map(item => {

            if (item === itemToBeFound) {
                return { ...item, quantity: item.quantity + 1 };
            }

            return item;
        });

        setItems(updatedItems);
    }

    const decreaseQuantityHandler = (itemToBeFound) => {
        const updatedItems = items.map((item) => {
            if (item === itemToBeFound) {
                if (item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };

                }
            }
            return item
        })

        setItems(updatedItems);
    }

    const removeItemHandler = (itemToBeFound) => {
        const updatedItems = items.filter((item) => item !== itemToBeFound)
        setItems(updatedItems)
    }

    return { items, decreaseQuantityHandler, removeItemHandler, increaseQuantityHandler, addItemHandler };

}

export default useTodoList;