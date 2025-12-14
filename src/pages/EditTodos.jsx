import React from "react";
import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

const EditTodos = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const loadTodo = async () => {
      try {
        const todo = await api.getTodoById(id);
        if (todo) {
          setTitle(todo.title || "");
          setDescription(todo.description || "");
          setStatus(todo.status || "pending");
          setImage(todo.image || "");
        } else {
          navigate("/todos");
        }
      } catch (error) {
        console.error("Error loading todo:", error);
        navigate("/todos");
      } finally {
        setLoading(false);
      }
    };

    loadTodo();
  }, [id, navigate]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.updateTodo(id, { title, description, status, image });
    navigate("/todos");
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="bg-gray-400 rounded-3xl p-5 w-[30%] mx-auto mt-10 flex flex-col">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-2 w-full block mx-auto my-3 focus:border-green-500 ring-green-500 rounded-2xl"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 w-full block mx-auto my-3 focus:border-green-500 ring-green-500 rounded-2xl"
        />

        <div className="w-[40%] mx-auto text-center">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex flex-col items-center justify-center gap-3">
          <div className="bg-gray-200 p-5 rounded-lg">
            <input type="file" accept="image/*" onChange={handleImage} />
            {image && (
              <img src={image} className="w-24 h-24 object-cover mx-auto mt-2" />
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 text-center"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTodos;

