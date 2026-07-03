import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";

import { db } from "./firebaseConfig";

// Agregar tarea
export const addTask = async (task) => {
  return await addDoc(collection(db, "tasks"), task);
};

// Obtener tareas de un usuario
export const getTasks = async (uid) => {
  const q = query(collection(db, "tasks"), where("uid", "==", uid));

  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Actualizar tarea
export const updateTask = async (id, data) => {
  const taskRef = doc(db, "tasks", id);

  return await updateDoc(taskRef, data);
};

// Eliminar tarea
export const deleteTask = async (id) => {
  return await deleteDoc(doc(db, "tasks", id));
};