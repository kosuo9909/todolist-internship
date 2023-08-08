import './App.css';
import Input from './components/Input';
import Items from './components/Items';
import React from 'react';
import useTodoList from './hooks/useTodoList';

function App() {
  const {
    items,
    decreaseQuantityHandler,
    removeItemHandler,
    increaseQuantityHandler,
    addItemHandler,
    markAsDoneHandler
  } = useTodoList('local');

  return (
    <div className="app-header">
      <Input addItemHandler={addItemHandler} />
      <Items
        items={items}
        removeItemHandler={removeItemHandler}
        increaseQuantityHandler={increaseQuantityHandler}
        decreaseQuantityHandler={decreaseQuantityHandler}
        markAsDoneHandler={markAsDoneHandler}
      />
    </div>
  );
}

export default App;
