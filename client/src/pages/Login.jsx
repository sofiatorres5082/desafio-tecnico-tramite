import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";
import Input from "../components/Input.jsx";
import InputPassword from "../components/InputPassword.jsx";
import Button from "../components/Button.jsx";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Resetea el mensaje de error

    try {
      const data = await login(email, password);
      console.log(data);

      if (data.admin) {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Credenciales inválidas, inténtelo de nuevo.");
    }
  };

  return (
    // Fondo
    <main className="bg-[#f2f7ff] bg-fixed h-screen flex items-center justify-center overflow-x-hidden">
      {/* Contenedor para el login */}
      <div className="bg-white p-5 flex rounded-3xl shadow-lg max-w-3xl">
        {/* Formulario */}
        <div className="md:w-1/2 px-16 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center text-[#576572] select-none">
            Login
          </h2>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-8"
              required
            />
            <InputPassword
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className=""
              required
            />
            <Button type="submit">Iniciar sesión</Button>
          </form>
          {error && (
            <div className="mt-4 text-[#4481ff] text-center text-sm">
              {error}
            </div>
          )}
          {/* División */}
          <div className="mt-10 grid grid-cols-3 items-center text-white">
            <hr className="border-gray-500"></hr>
            <p className="text-center text-gray-500 text-sm">O</p>
            <hr className="border-gray-500"></hr>
          </div>
          {/* Botón registrar */}
          <Button type="submit" onClick={() => navigate("/registrar")} className="mt-8">Registrar</Button>
        </div>
        {/* Imagen */}
        <div className="md:h-[25rem] xl:h-[30rem] flex items-center justify-center md:block hidden w-1/2 bg-[#4481ff] rounded-3xl">
          <img
            src="/images/ImagenLogin.png"
            alt="Marca de San Nicolás de los Arroyos"
            className="max-h-full max-w-full"
          />
        </div>
      </div>
    </main>
  );
};

export default Login;
