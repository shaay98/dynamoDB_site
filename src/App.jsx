import './App.css'
import "./dynamo.js"

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');


  useEffect(() => {
  scanTodos().then(setTodos);
  }, []);

  const handleAdd = async () => {
    if (!text.trim()) return;
    const newItem = { id: Date.now().toString(), text, completed: false };
    await createTodo(newItem);
    setTodos(prev => [...prev, newItem]);
    setText('');
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Todo App</h1>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="New todo"
        style={{ marginRight: 8 }}
      />
      <button onClick={handleAdd}>Add</button>

      <ul style={{ marginTop: 16 }}>
        {todos.map(t => (
          <li key={t.id}>{t.text}</li>
        ))}
      </ul>
    </div>
  );
}
export default App