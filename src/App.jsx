import './App.css';
import { useEffect, useState} from 'react';
import "./dynamo.js"
import { createToDo, scanToDo } from './dynamo.js';

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

  return (
    <div>
      <h1>ToDo App</h1>
      <label>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="New ToDo"
      />
      </label>
      <button onClick={handleAdd}>Add</button>
      <ul>
        {
          todos.map(todo =>(
           <li key={todo.id}>
            {todo.text}

         </li>
          ))
        }
      </ul>
      
    </div>
  );
}
export default App