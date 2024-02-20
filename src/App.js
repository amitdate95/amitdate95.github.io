import './App.css';
import TodoList from './TodoList'
import { useState } from 'react';
function App() {
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState("");

  const addTodo = (text) => {
    if(text){
      setTodos([...todos, { text, completed: false }]);
      setCurrentTodo('');
    }
  };

  const toggleTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div>
      <h1>ToDos App</h1>
    
      <input onChange={(e) => setCurrentTodo(e.target.value)} value={currentTodo} />

      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        removeTodo={removeTodo}
        addTodo={addTodo}
      />
      <button onClick={() => addTodo(currentTodo)}>Add</button>
    </div>
  );
}

export default App;