import axios, { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { TaskContext } from "../contexts/TaskContext";
import { Task } from "../models/task";

export default function UpdateForm({ id, obj }: { id: number, obj: Task }) {
    const [task, setTask] = useState<Task>({ ...obj, id } || {});
    const { editTask, removeTask } = useContext(TaskContext);
    const [error, setError] = useState<string | null>(null);

    return (
        <dialog id={`my_modal_${id}`} className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Update task!</h3>
                <p className="py-4">Please fill the fields below.</p>
                {error && <p className="py-2 text-red-600">{error}</p>}
                <div className="form-control">
                    <label className="font-bold" htmlFor="title">Title</label>
                    <input minLength={10} value={task.title} className="p-3 rounded-md" type="text" id="title" name="title" placeholder="Title" onChange={(e) => setTask({ ...task, title: e.target.value })} />
                </div>
                <div className="form-control">
                    <label className="font-bold" htmlFor="description">Description</label>
                    <textarea value={task.description} className="p-3 rounded-md" id="description" name="description" placeholder="Description" onChange={(e) => setTask({ ...task, description: e.target.value })}></textarea>
                </div>
                <div className="form-control">
                    <label className="font-bold" htmlFor="due">Due</label>
                    <input value={task.due} className="p-3 rounded-md" type="datetime-local" id="due" name="due" onChange={(e) => setTask({ ...task, due: e.target.value })} />
                </div>
                <div className="modal-action">
                    <button onClick={async () => {
                        try {
                            const { status, data } = await axios.put(`${import.meta.env.VITE_API_URL}/tasks/${id}`, task);
                            if (status !== 200) return setError(data.message);
                            editTask(id, task);
                            (document.getElementById(`my_modal_${id}`)! as HTMLDialogElement).close()
                        } catch (e) {
                            const { response } = e as AxiosError;
                            if (response) {
                                setError((response as any).data.message);
                            }
                        }
                    }} className="btn btn-primary">Submit</button>
                    <button onClick={async () => {
                        try {
                            const { status, data } = await axios.delete(`${import.meta.env.VITE_API_URL}/tasks/${id}`);
                            if (status !== 200) return setError(data.message);
                            removeTask(id);
                            (document.getElementById(`my_modal_${id}`)! as HTMLDialogElement).close()
                        } catch (e) {
                            const { response } = e as AxiosError;
                            if (response) {
                                setError((response as any).data.message);
                            }
                        }
                    }} className="btn btn-error">Delete</button>
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}