import { useState } from "react";
import { register } from "../services/authService";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await register(email, password);

      alert("Usuario registrado correctamente");

      console.log(userCredential.user);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Crear Cuenta</h1>

      <form onSubmit={handleRegister}>
        <div>
          <label>Correo electrónico</label>
          <br />
          <input
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label>Contraseña</label>
          <br />
          <input
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <br />

        <button type="submit">
          Registrarse
        </button>
      </form>
    </div>
  );
}

export default Register;