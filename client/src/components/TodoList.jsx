import "./TodoList.css";
import TodoItem from "./TodoItem.jsx";
import {useContext, useMemo, useState} from "react";
import {TodoStateContext} from "../TodoContext.jsx";

export default function TodoList() {
  //구조분해할당으로 받아선 안됨
  //App 컴포넌트에서 todos 배열을 그대로 전달했기 때문
  const todos = useContext(TodoStateContext);

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

  const {totalCount, doneCount, notDoneCount} = useMemo(() => {
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
              <TodoItem key={todo.id} todo={todo}/>
          ))}
        </div>
      </div>
  );
}
