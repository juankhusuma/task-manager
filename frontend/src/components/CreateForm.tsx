import { useContext, useState } from "react";
import { Task } from "../models/task"
import axios, { AxiosError } from "axios";
import { TaskContext } from "../contexts/TaskContext";

export default function ModalForm() {
    const [task, setTask] = useState<Task>({
        title: "",
        description: "",
        due: new Date().toISOString(),
        done: false
    });
    const [error, setError] = useState<string | null>(null);

    const { addTask } = useContext(TaskContext);
    return (
        <dialog id="my_modal_0" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">Create a new task!</h3>
                {error && <p className="py-2 text-red-600">{error}</p>}
                <p className="py-4">Please fill all of the fields below.</p>
                <div className="form-control">
                    <label className="font-bold" htmlFor="title">Title</label>
                    <input className="p-3 rounded-md" type="text" id="title" name="title" placeholder="Title" onChange={(e) => setTask({ ...task, title: e.target.value })} />
                </div>
                <div className="form-control">
                    <label className="font-bold" htmlFor="description">Description</label>
                    <textarea className="p-3 rounded-md" id="description" name="description" placeholder="Description" onChange={(e) => setTask({ ...task, description: e.target.value })}></textarea>
                </div>
                <div className="form-control">
                    <label className="font-bold" htmlFor="due">Due</label>
                    <input min={Date.now()} className="p-3 rounded-md" type="datetime-local" id="due" name="due" onChange={(e) => setTask({ ...task, due: e.target.value })} />
                </div>
                <div className="modal-action">
                    <button onClick={async () => {
                        try {
                            await axios.post(`${import.meta.env.VITE_API_URL}/tasks`, task);
                            setTask({
                                title: "",
                                description: "",
                                due: new Date().toISOString(),
                                done: false
                            });
                            (document.getElementById('my_modal_0')! as HTMLDialogElement).close()
                            addTask(task);
                        } catch (e) {
                            const { response } = e as AxiosError;
                            if (response) {
                                setError((response as any).data.message);
                            }
                        }
                    }} className="btn btn-primary">Submit</button>
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}