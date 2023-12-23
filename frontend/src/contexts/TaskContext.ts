import { createContext } from "react";
import { Task } from "../models/task";

export interface ITaskContext {
    tasks: Task[];
    addTask: (task: Task) => void;
    removeTask: (id: number) => void;
    toggleTask: (id: number) => void;
    editTask: (id: number, task: Task) => void;
}

export const TaskContext = createContext<ITaskContext>({
    tasks: [],
    addTask: () => { },
    removeTask: () => { },
    toggleTask: () => { },
    editTask: () => { }
});

