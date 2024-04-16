import { useRef, useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import TodoEditor from "./components/TodoEditor.jsx";
import TodoList from "./components/TodoList.jsx";

const mockData = [
  {
    id: 1,
    isDone: true,
    content: "React 공부하기",
    createdAt: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "Spring boot 공부하기",
    createdAt: new Date().getTime(),
  },
  {
    id: 3,
    isDone: true,
    content: "Kotlin 공부하기",
    createdAt: new Date().getTime(),
  },
];

function App() {
  const [todos, setTodos] = useState(mockData);
  const idRef = useRef(3);

  const onCreate = (content) => {
    const newTodo = {
      id: ++idRef.current,
      isDone: false,
      content,
      createdAt: new Date().getTime(),
    };

    setTodos([...todos, newTodo]);
  };

  const onUpdate = (targetId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === targetId ? { ...todo, isDone: !todo.isDone } : todo,
      ),
    );
  };

  const onDelete = (targetId) => {
    setTodos(todos.filter((todo) => todo.id !== targetId));
  };

  return (
    <div className="App">
      <Header />
      <TodoEditor onCreate={onCreate} />
      <TodoList todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
