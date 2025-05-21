export type Task = {
  id: string | number;
  status: "completed" | "pending";
  title?: string;
  [key: string]: any;
};

type Action =
  | { type: "add"; task: Task }
  | { type: "update"; id: string | number }
  | { type: "delete"; id: string | number };

export function reducer(tasks: Task[], action: Action): Task[] {
  if (action.type === "add") {
    return [
      ...tasks,
      action.task,
    ];
  } else if (action.type === "update") {
    return tasks.map((task) => {
      if (task.id === action.id) {
        return {
          ...task,
          status: task.status === "completed" ? "pending" : "completed",
        };
      }
      return task;
    });
  } else if (action.type === "delete") {
    return tasks.filter((task) => task.id !== action.id);
  }

  return tasks;
}