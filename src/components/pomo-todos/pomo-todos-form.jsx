import React, {useState} from 'react';

const PomoTodosForm = (props) => {

  const [input, setInput ] = useState('')

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // props.onSubmit({
    //   id: Math.floor(Math.random() * 10000),
    //   text: input
    // })
    setInput('')
  }


  return (
    <div className="modal-content">
      <div className="modal-body">
        Add todos
        <form className="todos-form" onSubmit={handleSubmit}>
          <input type="text" name="text" className="todo-input" value={input} placeholder="Add todo" onChange={handleChange}/>
          <button className="todo-button">Add Todo</button>
        </form>
      </div>
   </div>
  );
}

export default PomoTodosForm;
