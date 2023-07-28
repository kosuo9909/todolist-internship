import { useEffect, useState } from 'react';
import './App.css';
import Input from './components/Input';
import RenderItems from './components/RenderItems';

function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("items")) || []);

  const addItemHandler = (newItem) => {
    setItems(prevItems => [...prevItems, newItem]);
  }

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items))
  }, [items])

  return (
    <div className="App">
      <Input addItemHandler={addItemHandler} />
      <RenderItems items={items}/>
    </div>
  );
}

export default App;
