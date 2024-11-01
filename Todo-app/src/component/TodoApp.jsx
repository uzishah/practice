import React, { useState } from "react";
import { MdCheck, MdDeleteForever } from "react-icons/md";
import "../index.css";

const TodoApp = () => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (value) => {
    setInputValue(value);
  };
  const [task, setTask] = useState([]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!inputValue) return;
    if (task.includes(inputValue)) {
      setInputValue("");
      return;
    }
    setTask((prev) => [...prev, inputValue]);

    setInputValue("");
  };
  const [dateTime, setdateTime] = useState("");

  const time = setInterval(() => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    setdateTime(`${formattedDate}- ${formattedTime}`);
  }, 1000);
  const handledelete = (value) => {
    console.log(task);
    console.log(value);

    const updatedTask = task.filter((currtask) => currtask !== value);
    setTask(updatedTask);
  };

  const handleTodoClear = () => {
    setTask([]);
  };

  return (
    <>
      <div>
        <header>TODO App</header>
        <h1>{dateTime}</h1>

        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            autoComplete="off"
            value={inputValue}
            onChange={(event) => {
              handleInputChange(event.target.value);
            }}
          ></input>
          <button> Add Task </button>
        </form>
      </div>

      <div>
        <ul>
          {task.map((currtask, index) => {
            return (
              <li key={index}>
                <span>{currtask}</span>
                <button className="check">
                  <MdCheck />
                </button>
                <button
                  className="delete"
                  onClick={() => {
                    handledelete(currtask);
                  }}
                >
                  <MdDeleteForever />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <button className="clear" onClick={handleTodoClear}>
        Clear All
      </button>
    </>
  );
};

export default TodoApp;
