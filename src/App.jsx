import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  // Load Todos
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // Save Todos
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add Todo
  const HandleAdd = () => {
    if (todo.trim() === "") return;

    setTodos([
      ...todos,
      {
        id: uuidv4(),
        todo,
        isCompleted: false,
      },
    ]);

    setTodo("");
  };

  // Delete Todo
  const HandleDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  // Edit Todo
  const HandleEdit = (id) => {
    const editTodo = todos.find((item) => item.id === id);

    setTodo(editTodo.todo);

    setTodos(todos.filter((item) => item.id !== id));
  };

  // Input Change
  const HandleChange = (e) => {
    setTodo(e.target.value);
  };

  // Checkbox
  const HandleCheckbox = (e) => {
    const id = e.target.name;

    const newTodos = [...todos];

    const index = newTodos.findIndex((item) => item.id === id);

    newTodos[index].isCompleted = !newTodos[index].isCompleted;

    setTodos(newTodos);
  };

  const buttonStyle =
    "bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition";

  return (
    <div className="min-h-screen bg-slate-300">
      {/* Navbar */}
      <nav className="bg-slate-800 text-white px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold">P-Task</h1>

        <div className="flex gap-6">
          <p className="hover:text-blue-400 cursor-pointer">Home</p>
          <p className="hover:text-blue-400 cursor-pointer">Tasks</p>
          <p className="hover:text-blue-400 cursor-pointer">Description</p>
        </div>
      </nav>

      {/* Main */}
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl mt-10 p-6">
        <h2 className="text-3xl font-bold mb-5">Add Todo</h2>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={todo}
            onChange={HandleChange}
            placeholder="Enter your task..."
            className="flex-1 border border-gray-400 rounded-lg p-3 outline-none"
          />

          <button onClick={HandleAdd} className={buttonStyle}>
            Add
          </button>
        </div>

        <h2 className="text-2xl font-bold mt-8 mb-4">Your Todos</h2>

        {todos.length === 0 && (
          <p className="text-gray-500 text-center py-5">
            No Todos Yet.
          </p>
        )}

        {todos.map((item) => (
          <div
            key={item.id}
            className="bg-slate-100 rounded-lg shadow p-4 mt-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                name={item.id}
                checked={item.isCompleted}
                onChange={HandleCheckbox}
              />

              <p
                className={`text-lg ${item.isCompleted ? "line-through text-gray-500" : ""
                  }`}
              >
                {item.todo}
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => HandleEdit(item.id)}
                className={buttonStyle}
              >
                Edit
              </button>

              <button
                onClick={() => HandleDelete(item.id)}
                className={buttonStyle}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;