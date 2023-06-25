import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import './App.css'

function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function handleSubmit(e) {
    e.preventDefault()

    setTodos(currentTodos => {
      return [
        ...currentTodos, {
          id: crypto.randomUUID(), title: newItem, completed: false
        }
      ]
    })
    setNewItem("")
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }
        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  return (
    <>
      <form className="new-item-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="item" id="input-label">new item</label>
          <input className='input' type="text" id="item" value={newItem} onChange={(e) => setNewItem(e.target.value)} />
          <button className='btn btn-primary' id='btn-add'>Add Item</button>
        </div>
      </form>
      <div className="todo-list">
        <h1>Todo List</h1>
        <ul className='lists'>
          {todos.length === 0 && "No Todos"}
          {todos.map(todo => {
            return (
              <li key={todo.id}>
                <label>
                  <input onChange={(e) => toggleTodo(todo.id, e.target.checked)} className='check' type="checkbox" checked={todo.completed} />
                  {todo.title}
                  <button onClick={() => deleteTodo(todo.id)} className='btn btn-danger'>delete</button>
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default App
