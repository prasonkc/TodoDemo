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
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const loadTodo = async () => {
      try {
        setError(null);
        const todo = await api.getTodoById(id);
        if (todo) {
          setTitle(todo.title || "");
          setDescription(todo.description || "");
          setStatus(todo.status || "pending");
          setImage(todo.image || "");
        } else {
          setError('Todo not found');
        }
      } catch (err) {
        setError(err.message || 'Failed to load todo. Please try again.');
        console.error("Error loading todo:", err);
      } finally {
        setLoading(false);
      }
    };

    loadTodo();
  }, [id]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSaving(true);

    try {
      await api.updateTodo(id, { title, description, status, image });
      navigate("/todos");
    } catch (err) {
      setError(err.message || 'Failed to update. Please try again.');
      console.error('Error updating todo:', err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (error && !title) {
    return (
      <div className="text-center mt-10">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-auto w-[50%] mb-4">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
        <button
          onClick={() => navigate("/todos")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Back to Todos
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-400 rounded-3xl p-5 w-[30%] mx-auto mt-10 flex flex-col">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="border p-2 w-full block mx-auto my-3 focus:border-green-500 ring-green-500 rounded-2xl"
          disabled={saving}
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="border p-2 w-full block mx-auto my-3 focus:border-green-500 ring-green-500 rounded-2xl"
          disabled={saving}
        />

        <div className="w-[40%] mx-auto text-center">
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2"
            disabled={saving}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex flex-col items-center justify-center gap-3">
          <div className="bg-gray-200 p-5 rounded-lg">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImage}
              disabled={saving}
            />
            {image && (
              <img src={image} className="w-24 h-24 object-cover mx-auto mt-2" />
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 text-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={saving}
          >
            {saving ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTodos;

