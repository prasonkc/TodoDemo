import React from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const TodoCard = ({ todo, onDelete }) => {
  const handleDelete = async () => {
    await api.deleteTodo(todo.id);
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <div class="w-[70%] mx-auto rounded-xl bg-gray-600 backdrop-blur-lg border border-black shadow-xl flex justify-between p-5 m-5">
      <div className="contents flex flex-col">
        <div className="flex gap-10 items-center">
          <h3 class="text-xl font-semibold text-black">{todo.title}</h3>

          <span
            className={`text-sm ${
              todo.status === "completed" ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {todo.status}
          </span>
        </div>

        <p class="mt-2 text-sm text-black">{todo.description}</p>

        {todo.image && (
          <img src={todo.image} className="w-16 h-16 object-cover" />
        )}
      </div>

      <div className="buttons flex gap-5">
        <Link to={`/todos/${todo.id}/edit`} className="bg-blue-600 text-white p-3 h-10 rounded">Edit</Link>

        <button class="" onClick={handleDelete} className="bg-blue-600 text-white p-3 h-10 rounded">Delete</button>
      </div>
    </div>
  );
};

export default TodoCard;
