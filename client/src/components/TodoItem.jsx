import "./TodoItem.css";
import { useContext } from "react";
import { TodoDispatchContext } from "../TodoContext.jsx";

export default function TodoItem({ todo }) {
  const { onUpdate, onDelete } = useContext(TodoDispatchContext);

  const onChangeCheckbox = () => {
    onUpdate(todo.id);
  };

  const onClickDeleteButton = () => {
    onDelete(todo.id);
  };

  return (
    <div className="TodoItem">
      <input
        type="checkbox"
        checked={todo.isDone}
        onChange={onChangeCheckbox}
      />
      <div
        className={`content ${todo.isDone ? "checked" : ""}`}
        onClick={onChangeCheckbox}
      >
        {todo.content}
      </div>
      <div className="date">
        {new Date(todo.createdAt).toLocaleDateString("ko")}
      </div>
      <button onClick={onClickDeleteButton}>삭제</button>
    </div>
  );
}
