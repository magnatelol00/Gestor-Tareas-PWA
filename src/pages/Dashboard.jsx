import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  addTask,
  getTasks,
  deleteTask,
  updateTask,
} from "../services/taskService";
import TaskForm from "../components/tasks/TaskForm";

function Dashboard() {
  const { currentUser } = useAuth();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (currentUser) {
      loadTasks();
    }
  }, [currentUser]);

  const loadTasks = async () => {
    try {
      const data = await getTasks(currentUser.uid);
      setTasks(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTask = async (task) => {
    try {
      await addTask(task, currentUser.uid);

      alert("Tarea creada correctamente");

      loadTasks();
    } catch (error) {
      console.error(error);
      alert("Error al guardar la tarea");
    }
  };

  const handleDeleteTask = async (id) => {
    const confirmar = window.confirm(
      "¿Estás seguro de eliminar esta tarea?"
    );

    if (!confirmar) return;

    try {
      await deleteTask(id);

      alert("Tarea eliminada correctamente");

      loadTasks();
    } catch (error) {
      console.error(error);
      alert("Error al eliminar la tarea");
    }
  };

  const handleToggleCompleted = async (task) => {
    try {
      await updateTask(task.id, {
        completed: !task.completed,
      });

      loadTasks();
    } catch (error) {
      console.error(error);
      alert("Error al actualizar la tarea");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Dashboard</h1>

      <p>Bienvenido <strong>{currentUser?.email}</strong></p>

      <hr />

      <TaskForm onAddTask={handleAddTask} />

      <hr />

      <h2>Mis tareas</h2>

      {tasks.length === 0 ? (
        <p>No hay tareas registradas.</p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            style={{
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              marginBottom: "15px",
            }}
          >
            <h3>{task.title}</h3>

            <p>{task.description}</p>

            <p>
              Estado:{" "}
              <strong>
                {task.completed
                  ? "✅ Completada"
                  : "⏳ Pendiente"}
              </strong>
            </p>

            <button
              onClick={() => handleToggleCompleted(task)}
            >
              {task.completed
                ? "↩️ Marcar pendiente"
                : "✅ Completar"}
            </button>

            <button
              onClick={() => handleDeleteTask(task.id)}
              style={{
                marginLeft: "10px",
              }}
            >
              🗑 Eliminar
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;