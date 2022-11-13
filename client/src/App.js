import "./App.css";
import TodoListItem from "./TodoListItem";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const App = () => {
  const [todos, setTodos] = useState([]);
  let [currentTitle, setCurrentTitle] = useState("");

  const deleteTodo = (id) => {
    axios.delete("http://localhost:3001/delete/" + id).then((res) => {
      if (res.status == 200) {
        toast.success("Todo successfully deleted");
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
      } else {
        toast.error("Server error! cannot delete todo");
      }
    });
  };
  const addTodo = (title) => {
    axios
      .post("http://localhost:3001/addTodo", {
        title,
      })
      .then((res) => {
        if (res.status == 200) {
          toast.success("Todo added");
          setTodos([
            ...todos,
            {
              id: todos.at(-1).id + 1,
              title,
              completed: false,
            },
          ]);
        } else {
          toast.error("Server error! cannot add todo");
        }
      });
  };

  useEffect(() => {
    axios.get("http://localhost:3001/getAllTodos").then(({ data }) => {
      setTodos(data);
    });
  }, []);
  return (
    <div className="App">
      <h1 className="intro-text">TRACK YOUR DAILY ACTIVITIES!</h1>
      <div className="todo-container">
        <div className="todo-container-header">
          <span className="todo-container-header-title">TODOX</span>
          <div className="todo-container-input">
            <input
              placeholder="Enter todo"
              type="text"
              value={currentTitle}
              onChange={(e) => {
                setCurrentTitle(e.target.value);
              }}
            />
            <button
              onClick={() => {
                if (currentTitle == "") {
                  toast.error("Todo cannot be empty!");
                  return;
                }
                addTodo(currentTitle);
              }}
            >
              Add
            </button>
          </div>
        </div>

        <div className="todo-container-body">
          {todos.length > 0 ? (
            todos.map((todo) => (
              <TodoListItem
                key={todo.id}
                deleteTodo={deleteTodo}
                id={todo.id}
                title={todo.title}
              ></TodoListItem>
            ))
          ) : (
            <h2>Nothing here yet..Add some todos!</h2>
          )}
        </div>
      </div>
      <div>
        <Toaster position="top-right" />
      </div>
    </div>
  );
};

export default App;
