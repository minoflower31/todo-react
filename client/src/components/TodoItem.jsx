import "./TodoItem.css";

export default function TodoItem({ todo, onUpdate, onDelete }) {
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
      <div className="content">{todo.content}</div>
      <div className="date">
        {new Date(todo.createdAt).toLocaleDateString("ko")}
      </div>
      <button onClick={onClickDeleteButton}>삭제</button>
    </div>
  );
}
