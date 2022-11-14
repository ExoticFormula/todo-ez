import React, { useState, useCallback, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import {
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import "./TodoListItem.css";

const TodoListItem = ({
  id,
  title,
  deleteTodo,
  updateTodoTitle,
  toggleCompleted,
  completed,
}) => {
  //focus the input on initial render
  const autoFocus = useCallback((el) => (el ? el.focus() : null), []);
  //state for toggling edit todo mode
  const [inEditMode, setInEditMode] = useState(false);
  //currently inputed text in edit mode
  const [modifiedTitle, setModifiedTitle] = useState(title);

  useEffect(() => {
    setModifiedTitle(title);
  }, [title]);
  return (
    <div className="todolistitem">
      {/* if in edit mode display input field else just the current todo */}
      {inEditMode ? (
        <div className="todolistitem-body">
          <input
            onFocus={(e) =>
              e.currentTarget.setSelectionRange(
                e.currentTarget.value.length,
                e.currentTarget.value.length
              )
            }
            ref={autoFocus}
            type="text"
            onChange={(e) => {
              setModifiedTitle(e.target.value);
            }}
            value={modifiedTitle}
          ></input>
        </div>
      ) : (
        <div className="todolistitem-body">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => {
              axios.put("http://localhost:3001/todos/" + id);
              toggleCompleted(id);
            }}
          />
          <span
            className="todolistitem-title"
            style={{
              textDecoration: completed ? "line-through" : "none",
            }}
          >
            {title}
          </span>
        </div>
      )}

      {/* if in edit mode show save and exit icons else edit and delete icons */}
      {inEditMode ? (
        <div className="todolistitem-controls">
          <SaveOutlined
            style={{ color: "white" }}
            onClick={() => {
              setInEditMode(false);

              if (modifiedTitle) {
                axios
                  .put("http://localhost:3001/todos/" + id, {
                    title: modifiedTitle,
                  })
                  .then((res) => {
                    if (res.status === 200) {
                      updateTodoTitle(id, modifiedTitle);

                      toast.success("Todo successfully updated");
                    } else toast.error("Cannot update todo");
                  });
              }
            }}
          ></SaveOutlined>
          <CloseCircleOutlined
            style={{ color: "white" }}
            onClick={() => {
              setModifiedTitle(title);

              setInEditMode(false);
            }}
          ></CloseCircleOutlined>
        </div>
      ) : (
        <div className="todolistitem-controls">
          <EditOutlined
            style={{ color: completed ? "grey" : "white" }}
            onClick={() => {
              if (completed) {
                toast.error("Cannot update completed todo");
                return;
              }
              setInEditMode(true);
            }}
          />
          <DeleteOutlined
            style={{ color: "white" }}
            onClick={() => {
              deleteTodo(id);
            }}
          ></DeleteOutlined>
        </div>
      )}
    </div>
  );
};

export default TodoListItem;
