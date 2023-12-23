import { useContext } from "react";
import { TaskContext } from "../contexts/TaskContext";
import { Task } from "../models/task";
import { AiFillEdit } from "react-icons/ai"
import axios from "axios";
import UpdateForm from "./UpdateForm";
export const TaskCard: React.FC<Task> = ({ title, id, description, done, due }) => {
    const { toggleTask } = useContext(TaskContext);
    return (
        <div className="task-card card bg-gray-800 my-5 hover:bg-gray-700 transition-colors">
            <UpdateForm obj={{
                title,
                description,
                due,
                done
            }} id={id!} />
            <div className="card-body max-w-fit flex flex-col md:flex-row justify-center md:justify-between items-center">
                <div>
                    <h1 className="card-title">{title}</h1>
                    <p className="text-wrap break-words w-full md:max-w-80 max-w-40">{description}</p>
                    <p>Due at {new Date(due).toLocaleDateString("id-ID")}</p>
                </div>
                <div className="edit-btn hidden gap-5">
                    <button onClick={async () => {
                        await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${id}`, { done: !done, title, description, due });
                        toggleTask(id!);
                    }} className="btn btn-primary">{done ? "Uncheck" : "Done"}</button>
                    <AiFillEdit onClick={() => (document.getElementById(`my_modal_${id}`)! as HTMLDialogElement).showModal()} className="text-2xl text-gray-300 hover:text-gray-100 transition-colors cursor-pointer" />
                </div>
            </div>
        </div>
    )
}