import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Footer from "../components/Footer";

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
      <motion.div
        className="container mx-auto px-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-tertiary/10 min-h-[calc(100vh-64px)] py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Title Section */}
        <motion.div
          className="text-center mb-8"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="text-5xl font-extrabold leading-tight bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent mb-3 w-max m-auto">
            Task Manager
          </h1>
          <p className="text-xl text-gray-700">Your task management app</p>
        </motion.div>

        {/* Card Container */}
        <motion.div
          className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent mb-4 text-center">
            {editIndex !== null ? 'Edit your todo' : 'Add your todo'}
          </h2>

          {/* Input + Add Button */}
          <motion.div
            className="flex gap-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="p-[2px] rounded-full bg-gradient-to-r from-primary via-secondary to-tertiary w-full">
              <input
                type="text"
                className="w-full px-4 py-2 rounded-full outline-none bg-white"
                placeholder="Enter todo"
                value={todoText}
                onChange={(e) => setTodoText(e.target.value)}
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleAddOrEdit}
              className="bg-gradient-to-r from-primary via-secondary to-tertiary cursor-pointer hover:opacity-90 text-white px-6 py-2 rounded-full transition duration-300"
            >
              {editIndex !== null ? 'Update' : 'Add'}
            </motion.button>
          </motion.div>

          {/* Todo List with AnimatePresence */}
          <div className="mt-6 space-y-4">
            {todos.length === 0 && (
              <motion.p
                className="text-center text-gray-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                No todos yet. Add one!
              </motion.p>
            )}

            <AnimatePresence>
              {todos.map((todo, index) => (
                <motion.div
                  key={index}
                  className="p-[2px] rounded-xl bg-gradient-to-r from-primary via-secondary to-tertiary shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="flex justify-between items-start bg-white p-4 rounded-xl">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        className="mt-1 accent-violet-700"
                        checked={todo.completed}
                        onChange={() => toggleComplete(index)}
                      />
                      <p
                        className={`text-lg ${
                          todo.completed
                            ? 'line-through text-gray-400'
                            : 'text-gray-800'
                        }`}
                      >
                        {todo.title}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleEdit(index)}
                        className="bg-primary/90 hover:bg-primary text-white px-3 py-1 rounded-full text-sm"
                      >
                        Edit
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleDelete(index)}
                        className="bg-secondary/90 hover:bg-secondary text-white px-3 py-1 rounded-full text-sm"
                      >
                        Delete
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>

      <Footer />
    </>
  );
}

export default TaskManager;
