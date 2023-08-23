/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

const getLocalStorageAccessors = () => {
  const getItem = (key) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : [];
  };

  const setItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  return { getItem, setItem };
};
const getSessionStorageAccessors = () => {
  const getItem = (key) => {
    const storedValue = sessionStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : [];
  }; 

  const setItem = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  return {getItem, setItem};
};

const useTodoList = (storageType) => {
  const createStorage = (type) => {
    
    switch (type) {
      case 'local':
        return getLocalStorageAccessors();
      case 'session':
        return getSessionStorageAccessors();
      case 'server':
        break;
      default:
        throw new Error(`Unsupported storage type: ${type}`);
    }
  };

  const storage = createStorage(storageType);

  const [items, setItems] = useState(storage.getItem('items') || []);

  const addItemHandler = (newItem) => {
    setItems((prevItems) => [...prevItems, newItem]);
  };

  const markAsDoneHandler = (itemToBeFound) => {
    const updatedItems = items.map((item) => {
      if (item.id === itemToBeFound.id) {
        return { ...item, checked: !item.checked };
      }
      return item;
    });
    setItems(updatedItems);
  };

  useEffect(() => {
    storage.setItem('items', items);
  }, [items]);

  const increaseQuantityHandler = (itemToBeFound) => {
    const updatedItems = items.map((item) => {
      if (item === itemToBeFound) {
        return { ...item, quantity: item.quantity + 1 };
      }

      return item;
    });

    setItems(updatedItems);
  };

  const decreaseQuantityHandler = (itemToBeFound) => {
    const updatedItems = items.map((item) => {
      if (item === itemToBeFound) {
        if (item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });

    setItems(updatedItems);
  };

  const removeItemHandler = (itemToBeFound) => {
    const updatedItems = items.filter((item) => item !== itemToBeFound);
    setItems(updatedItems);
  };

  return {
    items,
    decreaseQuantityHandler,
    removeItemHandler,
    increaseQuantityHandler,
    addItemHandler,
    markAsDoneHandler
  };
};

export default useTodoList;
