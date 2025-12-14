// This file mimics an API service using localStorage
const STORAGE_KEY = "todo";

// Simulate api response delay for 0.5s
const delay = (ms = 500) => new Promise((res) => setTimeout(res, ms));

// get all items from localstorage
const getTodos = async () => {
  await delay();
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
};

// get single item by id
const getTodoById = async (id) => {
  const todos = await getTodos();
  return todos.find((t) => t.id === Number(id));
};

// add new item to localstorage
const createTodo = async (todo) => {
  const todos = await getTodos();
  const newTodo = { ...todo, id: Date.now() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...todos, newTodo]));
  return newTodo;
};

// update item
const updateTodo = async (id, updated) => {
  const todos = await getTodos();
  const newTodos = todos.map((t) =>
    t.id === Number(id) ? { ...t, ...updated } : t
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newTodos));
};

// delete item from localstorage
const deleteTodo = async (id) => {
  const todos = await getTodos();
  if (!window.confirm("Delete this todo?")) return;
  
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(todos.filter((t) => t.id !== Number(id)))
  );
};

export default { getTodos, getTodoById, createTodo, updateTodo, deleteTodo };
