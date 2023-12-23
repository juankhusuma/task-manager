import { useEffect, useState } from "react"
import { Task } from "./models/task"
import axios from "axios"
import { TaskContext } from "./contexts/TaskContext";
import CreateForm from "./components/CreateForm";
import { TaskCard } from "./components/TaskCard";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    axios.get<Task[]>(`${import.meta.env.VITE_API_URL}/tasks`)
      .then(({ data }) => {
        setTasks(data);
      })
  }, [])

  return (
    <main className="p-5">
      <TaskContext.Provider value={{
        tasks,
        addTask: (task: Task) => {
          setTasks([...tasks, task])
        },
        removeTask: (id: number) => {
          setTasks(tasks.filter(task => task.id !== id))
        },
        editTask: (id: number, updatedTask: Task) => {
          setTasks(tasks.map(task => task.id === id ? updatedTask : task))
        },
        toggleTask: (id: number) => {
          setTasks(tasks.map(task => task.id === id ? { ...task, done: !task.done } : task))
        }
      }}>
        <button className="btn btn-primary w-full" onClick={
          () => (document.getElementById('my_modal_0')! as HTMLDialogElement).showModal()}
        >Add New Entry</button>
        <CreateForm />
        <div className="collapse w-full my-10 bg-base-200">
          <input type="radio" name="my-accordion-1" checked />
          <div className="collapse-title text-xl font-medium">
            Ongoing Tasks
          </div>
          <div className="collapse-content">
            {tasks.filter(task => !task.done).length == 0 && <p className="text-center">There are no ongoing task.</p>}
            {tasks.filter(task => !task.done).map(task => <TaskCard {...task} key={task.id} />)}
          </div>
        </div>
        <div className="collapse bg-base-200">
          <input type="radio" name="my-accordion-1" />
          <div className="collapse-title text-xl font-medium">
            Finished Tasks
          </div>
          <div className="collapse-content">
            {tasks.filter(task => task.done).length == 0 && <p className="text-center">There are no finished task.</p>}
            {tasks.filter(task => task.done).map(task => <TaskCard {...task} key={task.id} />)}
          </div>
        </div>
      </TaskContext.Provider>
    </main>
  )
}

export default App
