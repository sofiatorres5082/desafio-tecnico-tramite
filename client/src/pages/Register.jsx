import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input";
import InputPassword from "../components/InputPassword";
import Button from "../components/Button";
import { register } from "../services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null); 

    try {
      const data = await register(name, lastName, email, password);
      console.log("Usuario registrado:", data);
      navigate("/login"); // Redirige al login después del registro exitoso
    } catch (err) {
      console.error("Error durante el registro:", err);

      // Manejo de errores específicos
      if (err.response?.data?.error === "EMAIL_ALREADY_EXISTS") {
        setError("El email ya está en uso. Por favor, intenta con otro.");
      } else {
        setError("Error al registrar el usuario, inténtelo de nuevo.");
      }
    }
  };

  return (
    <main className="bg-[#f2f7ff] h-screen flex items-center justify-center overflow-x-hidden">
      <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-16 justify-center items-center w-80 sm:w-96">
        <h2 className="mb-9 text-2xl font-bold text-center text-[#576572] select-none">
          Registrarse
        </h2>
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className=""
            required
          />
          <Input
            type="text"
            placeholder="Apellido"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className=""
            required
          />
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=""
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
          {error && <p className=" text-xs text-red-500">{error}</p>}
          <Button type="submit" onClick={""} className="mt-6">
            Registrar
          </Button>
        </form>
      </div>
    </main>
  );
};

export default Register;
