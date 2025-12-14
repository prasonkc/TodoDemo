import React from "react";

const TodoCard = ({todo}) => {
  return (
    <div class="w-[70%] mx-auto rounded-xl bg-gray-600 backdrop-blur-lg border border-black shadow-xl flex justify-between p-5 m-5">
      <div className="contents flex flex-col">
        <h3 class="text-xl font-semibold text-black">
          {todo.title}
        </h3>

        <p class="mt-2 text-sm text-black">
          {todo.description}
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
