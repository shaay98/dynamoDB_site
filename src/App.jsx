import './App.css';
import { useEffect, useState} from 'react';
import "./dynamo.js"
import { createToDo, deleteTodo, scanToDo, toggleDone } from './dynamo.js';
import ToDo from './ToDo.jsx';

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');


  useEffect(() => {
  scanToDo().then(setTodos);
  }, []);

  const handleAdd = async () => {
    if (!text.trim()) return;
    const newItem = { id: Date.now().toString(), text, completed: false };
    await createToDo(newItem);
    setTodos(prev => [...prev, newItem]);
    setText('');
  };

  async function handleToggle(ToDo) {
    const flipped = !ToDo.completed;

    toggleDone (ToDo.id, flipped);
    setTodos((prev) => 
    prev.map((item) => 
    item.id === ToDo.id ? { ...item, completed: flipped } : item,
  ),
  );
}
async function handleDelete(id) {
  await deleteTodo(id);
  setTodos((prev) => prev.filter((item) => item.id != id));
}

  return (
    <>
      <h1>ToDo App</h1>
      <label>
      <input
        value={text}
        type='text'
        name='ToDo'
        id='ToDo'
        onChange={e => setText(e.target.value)}
        placeholder="New ToDo"
      />
      </label>
      <button onClick={handleAdd}>Add</button>
      <ToDo      
      ToDos={todos}
      onHandleDelete={handleDelete}
      onHandleUpdate={handleToggle}
      />
    </>
  );
}
export default App