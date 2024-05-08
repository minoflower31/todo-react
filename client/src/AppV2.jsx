import { useMemo, useReducer, useRef, useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import TodoEditor from "./components/TodoEditor.jsx";
import TodoList from "./components/TodoList.jsx";
import { TodoStateContext, TodoDispatchContext } from "./TodoContext.jsx";

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

function reducer(state, action) {
  switch (action.type) {
    case "CREATE": {
      return [...state, action.data];
    }
    case "UPDATE": {
      return state.map((it) =>
        it.id === action.data ? { ...it, isDone: !it.isDone } : it,
      );
    }
    case "DELETE": {
      return state.filter((it) => it.id !== action.data);
    }
  }
}

function AppV2() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: ++idRef.current,
        isDone: false,
        content,
        createdAt: new Date().getTime(),
      },
    });
  };

  const onUpdate = (targetId) => {
    dispatch({
      type: "UPDATE",
      data: targetId,
    });
  };

  const onDelete = (targetId) => {
    dispatch({
      type: "DELETE",
      data: targetId,
    });
  };

  const memoizedDispatches = useMemo(() => {
    return {
      onCreate,
      onUpdate,
      onDelete,
    };
  });

  return (
    <div className="App">
      <Header />
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={memoizedDispatches}>
          <TodoEditor />
          <TodoList />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default AppV2;
