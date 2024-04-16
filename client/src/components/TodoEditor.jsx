import "./TodoEditor.css";
import { useRef, useState } from "react";

export default function TodoEditor({ onCreate }) {
  const [content, setContent] = useState("");
  const inputRef = useRef();

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  const onClick = () => {
    if (content === "") {
      inputRef.current.focus();
      return;
    }

    onCreate(content);
    setContent("");
  };

  const onKeyDown = (e) => {
    // Enter Keycode = 13
    if (e.keyCode === 13) {
      onClick();
    }
  };

  return (
    <div className="TodoEditor">
      <input
        ref={inputRef}
        placeholder="오늘의 할일 작성하기"
        value={content}
        onKeyDown={onKeyDown}
        onChange={onChangeContent}
      />
      <button onClick={onClick}>추가</button>
    </div>
  );
}
