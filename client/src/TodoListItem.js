import React from "react";
import "./TodoListItem.css";
import axios from "axios";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { useState } from "react";
const TodoListItem = ({ id, title, deleteTodo }) => {
  const [completed, setCompleted] = useState(false);
  return (
    <div className="todolistitem">
      <div className="todolistitem-body">
        <input
          type="checkbox"
          onChange={() => {
            let updatedCompletedState = completed ? false : true;
            axios
              .put("http://localhost:3001/update/completed/" + id)
              .then((res) => {
                console.log(res);
              });
            setCompleted(updatedCompletedState);
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
      <div className="todolistitem-controls">
        <EditOutlined />
        <DeleteOutlined
          onClick={() => {
            deleteTodo(id);
          }}
        ></DeleteOutlined>
      </div>
    </div>
  );
};

export default TodoListItem;
