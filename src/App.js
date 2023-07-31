import './App.css';
import Input from './components/Input';
import RenderItems from './components/Items';
import React from 'react';
import useTodoList from './hooks/useTodoList';

function App() {
  const {items, decreaseQuantityHandler, removeItemHandler, increaseQuantityHandler, addItemHandler} = useTodoList()

  return (
    <div className="app-header">
      <Input addItemHandler={addItemHandler} />
      <RenderItems items={items} removeItemHandler={removeItemHandler} increaseQuantityHandler={increaseQuantityHandler} decreaseQuantityHandler={decreaseQuantityHandler} />
    </div>
  );
}

export default App;
