import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import TodoCard from '../components/TodoCard.jsx';
import { useState } from 'react';
import api from '../services/api.js';

 const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTodos = async () => {
    try {
      setError(null);
      const fetchedTodos = await api.getTodos();
      setTodos(fetchedTodos);
    } catch (err) {
      setError(err.message || 'Failed to load todos. Please try again.');
      console.error('Error loading todos:', err);
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      await loadTodos();
      setLoading(false);
    };
    fetchTodos();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-auto w-[50%] mb-4">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
        <button
          onClick={loadTodos}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
        <h1 className='text-center text-2xl font-extrabold m-5'>TODO LIST</h1>

        {/* Render todo cards */}
        {todos.map(todo => (
            <TodoCard key={todo.id} todo={todo} onDelete={loadTodos} />
        ))}

        <div className='text-center my-10'>
          <Link to="/todos/create" className="bg-black text-white p-3 text-center mx-auto rounded-xl">Create Todo</Link>
        </div>
    </div>
  )
}

export default Todos
