import { useState } from "react";
import { login } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await login(email, password);

      console.log("Inicio de sesión exitoso");
      console.log(userCredential.user);

      alert("Bienvenido " + userCredential.user.email);
    } catch (error) {
      console.error(error);

      alert("Error: " + error.message);
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>

      <form onSubmit={handleSubmit}>
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
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}

export default Login;