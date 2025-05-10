export default function ToDo ({ ToDos, onHandleDelete, onHandleUpdate}) {


return (
    <ul>
     {ToDos.map((todo) => (
        <li key={todo.id}  >
        
        {console.log (todo)}
       
        <input 
        onChange={() => onHandleUpdate(todo)}
        checked= {todo.completed}
        type="checkbox"
        name="done"
        id="done"
        />
        {todo.text}
        <button onClick={() => onHandleDelete(todo.id)} >X</button>
     </li>
     ))}
     </ul>
    );
}