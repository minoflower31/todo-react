import "./TodoEditor.css";

export default function TodoEditor() {
  return (
    <div className="TodoEditor">
      <input placeholder="오늘의 할일 작성하기" />
      <button>추가</button>
    </div>
  );
}
