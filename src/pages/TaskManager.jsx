import React, { useState } from 'react';
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

function TaskManager() {
  const [todoText, setTodoText] = useState('');
  const [todos, setTodos] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrEdit = () => {
    if (!todoText.trim()) return;

    if (editIndex !== null) {
      const updatedTodos = [...todos];
      updatedTodos[editIndex].title = todoText;
      setTodos(updatedTodos);
      setEditIndex(null);
    } else {
      setTodos([...todos, { title: todoText, completed: false }]);
    }

    setTodoText('');
  };

  const handleDelete = (index) => {
    const updated = todos.filter((_, i) => i !== index);
    setTodos(updated);
  };

  const handleEdit = (index) => {
    setTodoText(todos[index].title);
    setEditIndex(index);
  };

  const toggleComplete = (index) => {
    const updated = [...todos];
    updated[index].completed = !updated[index].completed;
    setTodos(updated);
  };

  return (
    <>
    <Navbar/>
      <div className="container mx-auto px-4 bg-violet-200 min-h-[calc(100vh-64px)] py-10">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold text-violet-900 mb-2">iTask</h1>
          <p className="text-xl text-gray-700">Your task management TaskManager</p>
        </div>

        <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold text-violet-800 mb-4 text-center">
            {editIndex !== null ? 'Edit your todo' : 'Add your todo'}
          </h2>

          <div className="flex gap-4">
            <input
              type="text"
              className="w-full border border-violet-400 px-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-violet-500"
              placeholder="Enter todo"
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
            />
            <button
              onClick={handleAddOrEdit}
              className="bg-violet-900 text-white px-6 py-2 rounded-full hover:bg-violet-700 transition duration-300"
            >
              {editIndex !== null ? 'Update' : 'Add'}
            </button>
          </div>

          {/* Todo List */}
          <div className="mt-6 space-y-4">
            {todos.length === 0 && (
              <p className="text-center text-gray-500">No todos yet. Add one!</p>
            )}

            {todos.map((todo, index) => (
              <div
                key={index}
                className="flex justify-between items-start bg-violet-50 border border-violet-300 p-4 rounded-xl shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 accent-violet-700"
                    checked={todo.completed}
                    onChange={() => toggleComplete(index)}
                  />
                  <p
                    className={`text-lg ${
                      todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
                    }`}
                  >
                    {todo.title}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(index)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-full text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TaskManager;
