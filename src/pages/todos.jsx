import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import TodoCard from '../components/TodoCard.jsx';
import { useState } from 'react';
import api from '../services/api.js';

 const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTodos = async () => {
   setTodos([
      ...await api.getTodos()
    ]);
  };

  useEffect(() => {
    loadTodos();
    setLoading(false);
  }, [todos]);

  if (loading) return <p>Loading...</p>;
  return (
    <div>
        <h1 className='text-center text-2xl font-extrabold m-5'>TODO LIST</h1>

        {/* Render todo cards */}
        {todos.map(todo => (
            <TodoCard key={todo.id} todo={todo} />
        ))}

        <div className='text-center my-10'>
          <Link to="/todos/create" className="bg-black text-white p-3 text-center mx-auto rounded-xl">Create Todo</Link>
        </div>
    </div>
  )
}

export default Todos
