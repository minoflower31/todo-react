import "./TodoList.css";
import TodoItem from "./TodoItem.jsx";
import { useMemo, useState } from "react";

export default function TodoList({ todos, onUpdate, onDelete }) {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const filterTodos = () => {
    if (search === "") {
      return todos;
    }

    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase()),
    );
  };

  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    console.log("called analyzedTodoData()");
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length;
    const notDoneCount = totalCount - doneCount;

    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos]);

  return (
    <div className="TodoList">
      <div className="todo-header">
        <h4>Todos</h4>
        <div className="todo-state">
          <div>
            전체 <span>{totalCount}</span>
          </div>
          <div>
            완료 <span>{doneCount}</span>
          </div>
          <div>
            미완료 <span>{notDoneCount}</span>
          </div>
        </div>
      </div>
      <div className="search-wrapper">
        <input
          value={search}
          onChange={onChangeSearch}
          placeholder="검색어를 입력하세요."
        />
        <i className="fa fa-search icon"></i>
      </div>
      <div className="todos_wrapper">
        {filterTodos().map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
