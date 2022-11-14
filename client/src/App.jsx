import "./App.css";
import TodoListItem from "./TodoListItem";
import logo from "./assets/images/logo.svg";
import emptyimage from "./assets/images/emptyimage.png";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
  const [todos, setTodos] = useState([]);
  //state for keeping track of currently completed todo count
  const [completedCount, setCompletedCount] = useState(0);

  //state for storing currently inputed text by user
  let [currentTitle, setCurrentTitle] = useState("");

  //fetch all todos on initial render
  useEffect(() => {
    axios.get("http://localhost:3001/todos/").then(({ data }) => {
      setTodos(data);
    });
  }, []);

  //whenever a todo state changes,recheck for change in completed todos count
  useEffect(() => {
    const completedtodos = todos.filter((todo) => todo.completed);
    setCompletedCount(completedtodos.length);
  }, [todos]);

  //function to toggle a todos completed state,passed down to each TodoListItem
  const toggleCompleted = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  //function to update a todo's title,passed to each TodoListItem
  const updateTodoTitle = (id, newTitle) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title: newTitle };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  //function to delete a todo,passed to each TodoListItem
  const deleteTodo = (id) => {
    axios.delete("http://localhost:3001/todos/" + id).then((res) => {
      if (res.status === 200) {
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
        toast.success("Todo successfully deleted");
      } else {
        toast.error("Server error! cannot delete todo");
      }
    });
  };

  //function to add a todo
  const addTodo = (title) => {
    axios
      .post("http://localhost:3001/todos/", {
        title,
      })
      .then((res) => {
        if (res.status === 200) {
          toast.success("Todo added");
          setCurrentTitle("");
          setTodos([
            ...todos,
            {
              id: todos.at(-1)?.id + 1 || 1,
              title,
              completed: false,
            },
          ]);
        } else {
          toast.error("Server error! cannot add todo");
        }
      });
  };

  return (
    <div className="App">
      <div className="todo-container">
        <div className="todo-container-header">
          <span className="todo-container-header-title">
            <img src={logo} height={25} /> TODO PARK
          </span>
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
                if (currentTitle === "") {
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
          {/* render all uncompleted todos under the title Todos */}
          {todos && todos.length > 0 ? (
            <>
              {!(todos.length === completedCount) && (
                <span className="todo-container-body-todocount">
                  Todos - {todos.length}
                </span>
              )}

              {todos.map(
                (todo) =>
                  !todo.completed && (
                    <TodoListItem
                      key={todo.id}
                      deleteTodo={deleteTodo}
                      updateTodoTitle={updateTodoTitle}
                      id={todo.id}
                      completed={todo.completed}
                      toggleCompleted={toggleCompleted}
                      title={todo.title}
                    ></TodoListItem>
                  )
              )}

              {/* render all uncompleted todos under the title Completed if any exists */}
              {completedCount > 0 && (
                <>
                  <span className="todo-container-body-todocount">
                    Completed - {completedCount}
                  </span>
                  {todos.map((todo) => {
                    if (todo.completed)
                      return (
                        <TodoListItem
                          key={todo.id}
                          deleteTodo={deleteTodo}
                          id={todo.id}
                          completed={todo.completed}
                          updateTodoTitle={updateTodoTitle}
                          toggleCompleted={toggleCompleted}
                          title={todo.title}
                        ></TodoListItem>
                      );
                  })}
                </>
              )}
            </>
          ) : (
            <>
              <h2>Its empty out here..Add some todos!</h2>

              <img src={emptyimage} className='todo-container-body-emptyimage' />
            </>
          )}
        </div>
      </div>
      <div>
        <Toaster
          position="top-right"
          duration={200}
          toastOptions={{
            duration: 1000,
          }}
        />
      </div>
    </div>
  );
};

export default App;
