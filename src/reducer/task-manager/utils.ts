import type { Task } from "./reducer";

export function createTask(title: string): Task {
    return { 
        id: Date.now(), 
        title, 
        status: "pending" 
    };
}
