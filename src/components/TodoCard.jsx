import React from "react";

const TodoCard = () => {
  return (
    <div class="w-full rounded-xl bg-gray-300 backdrop-blur-lg border border-black shadow-xl flex justify-between p-5">
      <div className="contents flex flex-col">
        <h3 class="text-xl font-semibold text-black">
          {/* {todo.title} */} TItle
        </h3>

        <p class="mt-2 text-sm text-black">
          {/* {todo.description} */} Description
        </p>
      </div>

      <div className="buttons flex gap-5">
        <button class="">Edit</button>

        <button class="">Delete</button>
      </div>
    </div>
  );
};

export default TodoCard;
