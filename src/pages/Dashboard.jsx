import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { addTask } from "../services/taskService";
import TaskForm from "../components/tasks/TaskForm";

function Dashboard() {
  const { currentUser } = useAuth();

  const [tasks, setTasks] = useState([]);

  const handleAddTask = async (task) => {
    try {
      const newTask = {
        ...task,
        uid: currentUser.uid,
        completed: false,
        createdAt: new Date(),
      };

      await addTask(newTask);

      setTasks([...tasks, newTask]);

      alert("Tarea creada correctamente");

    } catch (error) {
      console.error(error);
      alert("Error al guardar la tarea");
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>

      <p>Bienvenido {currentUser?.email}</p>

      <hr />

      <TaskForm onAddTask={handleAddTask} />
    </div>
  );
}

export default Dashboard;