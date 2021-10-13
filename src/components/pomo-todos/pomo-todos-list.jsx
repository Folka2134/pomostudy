import React, {useState} from 'react';
import PomoTodosForm from './pomo-todos-form';

const PomoTodosList = () => {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    if(!todo.text || /^\s*$/.test(todo.test)) {
      return
    }
    
    const newTodos = [todo, ...todos]

    setTodos(newTodos)
  }


  return (
    <div>
      <h1>Todos!</h1>
      <PomoTodosForm/>
    </div>
  );
}

export default PomoTodosList;
