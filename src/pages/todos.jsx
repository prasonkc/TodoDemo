import React from 'react'
import { Link } from "react-router-dom";
import TodoCard from '../components/TodoCard.jsx';

const todos = () => {
  return (
    <div>
        <h1 className='text-center text-2xl font-extrabold m-5'>TODO LIST</h1>

        {/* Render todo cards */}
        <TodoCard/>
    </div>
  )
}

export default todos
