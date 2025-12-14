import React from "react";

const TodoCard = ({ todo }) => {
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
        <button class="">Edit</button>

        <button class="">Delete</button>
      </div>
    </div>
  );
};

export default TodoCard;
