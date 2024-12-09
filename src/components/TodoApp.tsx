import React, { useState } from "react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const addTodo = () => {
    if (inputValue.trim() === "") return;
    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    setInputValue("");
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container">
      <h1>ToDo List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Введите новую задачу"
      />
      <button onClick={addTodo}>Добавить задачу</button>
      <h2>Невыполненные задачи</h2>
      <ul>
        {todos
          .filter((todo) => !todo.completed)
          .map((todo) => (
            <li key={todo.id}>
              <span
                onClick={() => toggleTodo(todo.id)}
                style={{ cursor: "pointer" }}
              >
                {todo.text}
              </span>
              <button onClick={() => removeTodo(todo.id)}>Удалить</button>
            </li>
          ))}
      </ul>
      <h2>Выполненные задачи</h2>
      <ul>
        {todos
          .filter((todo) => todo.completed)
          .map((todo) => (
            <li key={todo.id}>
              <span
                onClick={() => toggleTodo(todo.id)}
                style={{
                  cursor: "pointer",
                  textDecoration: todo.completed ? "line-through" : "none",
                }}
              >
                {todo.text}
              </span>
              <button onClick={() => removeTodo(todo.id)}>Удалить</button>
            </li>
          ))}
      </ul>
    </div>
  );
  
  
};
export default TodoApp;
