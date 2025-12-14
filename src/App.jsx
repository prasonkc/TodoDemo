import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Todos from "./pages/todos.jsx";

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/todos" />} />
          <Route path="/todos" element={<Todos />} />
        </Routes>
    </BrowserRouter>
  );
}
