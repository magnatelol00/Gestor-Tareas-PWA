import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

import { auth } from "./firebaseConfig";

// Iniciar sesión
export const login = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Registrar usuario
export const register = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// Cerrar sesión
export const logout = () => {
  return signOut(auth);
};

// Recuperar contraseña
export const resetPassword = (email) => {
  return sendPasswordResetEmail(auth, email);
};