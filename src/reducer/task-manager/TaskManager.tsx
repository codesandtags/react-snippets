import * as React from "react";
import { reducer, type Task } from "./reducer";
import { createTask } from "./utils";

export default function TaskManager() {
  const [tasks, dispatch] = React.useReducer(reducer, [] as Task[]);

  const handleUpdateTaskStatus = (id: string | number) => {
    dispatch({ type: "update", id });
  };

  const handleDeleteTask = (id: string | number) => {
    dispatch({ type: "delete", id });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    dispatch({ type: "add", task: createTask(formData.get("task")) });

    e.currentTarget.reset();
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <form onSubmit={handleSubmit}>
        <input name="task" placeholder="Task title" />
        <button className="primary" type="submit">
          Add Task
        </button>
      </form>
      <ul>
        {tasks.map((task: Task) => (
          <li key={task.id}>
            <div>
              <button
                className={`status ${task.status}`}
                onClick={() => handleUpdateTaskStatus(task.id)}
              />
              {task.title}
            </div>
            <button className="link" onClick={() => handleDeleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}