import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Todos from "./pages/todos.jsx";
import CreateTodos from "./pages/CreateTodos.jsx";
import EditTodos from "./pages/EditTodos.jsx";

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/todos" />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/todos/create" element={<CreateTodos />} />
          <Route path="/todos/:id/edit" element={<EditTodos />} />
        </Routes>
    </BrowserRouter>
  );
}
