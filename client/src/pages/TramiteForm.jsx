import React, { useState } from "react";
import { createTramite } from "../services/api";
import Input from "../components/Input";
import Button from "../components/Button";

const TramiteForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    dni: "",
    cuit: "",
    email: "",
    telefono: "",
    dominio: "",
    anio: "",
    archivoBaja: null,
    estado: "pendiente",
  });

  const [error, setError] = useState({
    nombre: null,
    apellido: null,
    dni: null,
    cuit: null,
    email: null,
    telefono: null,
    dominio: null,
    anio: null,
    archivoBaja: null,
  }); // Estado para manejar errores específicos

  const [success, setSuccess] = useState(""); // Estado para manejar un mensaje de éxito

  const resetError = () => {
    setError({
      nombre: null,
      apellido: null,
      dni: null,
      cuit: null,
      email: null,
      telefono: null,
      dominio: null,
      anio: null,
      archivoBaja: null,
      general: null,
    });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });

    // Validaciones específicas
    switch (name) {
      case "telefono":
        if (!/^\d+$/.test(value)) {
          setError({ ...error, telefono: "El teléfono debe ser un número" });
        } else {
          setError({ ...error, telefono: null });
        }
        break;
      case "email":
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
          setError({ ...error, email: "El email no es válido" });
        } else {
          setError({ ...error, email: null });
        }
        break;
      case "dni":
        if (!/^\d+$/.test(value) || value.length !== 8) {
          setError({ ...error, dni: "El DNI debe ser un número de 8 dígitos" });
        } else {
          setError({ ...error, dni: null });
        }
        break;
      case "cuit":
        if (!/^\d+$/.test(value) || value.length !== 11) {
          setError({
            ...error,
            cuit: "El CUIT debe ser un número de 11 dígitos",
          });
        } else {
          setError({ ...error, cuit: null });
        }
        break;
      case "anio":
        if (!/^\d+$/.test(value) || value.length !== 4) {
          setError({
            ...error,
            anio: "El año debe ser un número de 4 dígitos",
          });
        } else {
          setError({ ...error, anio: null });
        }
        break;
      default:
        setError({ ...error, [name]: null });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({
      nombre: null,
      apellido: null,
      dni: null,
      cuit: null,
      email: null,
      telefono: null,
      dominio: null,
      anio: null,
      archivoBaja: null,
    });
    setSuccess("");

    // Validaciones adicionales antes de enviar
    if (
      !formData.nombre ||
      !formData.apellido ||
      !formData.dni ||
      !formData.cuit ||
      !formData.email ||
      !formData.telefono ||
      !formData.dominio ||
      !formData.anio ||
      !formData.archivoBaja
    ) {
      setError({
        ...error,
        general: "Por favor, complete todos los campos",
      });
      return;
    }

    try {
      const response = await createTramite(
        formData.nombre,
        formData.apellido,
        formData.dni,
        formData.cuit,
        formData.email,
        formData.telefono,
        formData.dominio,
        formData.anio,
        formData.archivoBaja,
        formData.estado
      );

      if (response.errors) {
        // Si hay errores de validación, actualiza el estado de error
        const newErrors = {};
        response.errors.forEach((error) => {
          newErrors[error.field] = error.message;
        });
        setError(newErrors);
      } else {
        setSuccess("Trámite creado con éxito");
        setFormData({
          // Resetear el formulario
          nombre: "",
          apellido: "",
          dni: "",
          cuit: "",
          email: "",
          telefono: "",
          dominio: "",
          anio: "",
          archivoBaja: null,
          estado: "pendiente",
        });
      }
    } catch (error) {
      console.error("Error al crear el trámite:", error);
      resetError();
      setError({
        ...error,
        general:
          error.response?.data?.message || "Hubo un error al crear el trámite",
      });
    }
  };

  return (
    <>
      <h1 className="mt-20 mb-10 text-2xl font-bold text-center text-[#576572] select-none text-base">
        Alta de dominio automotor y patente de rodado
      </h1>
      <div className="flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-80 md:w-3/4"
        >
          {[
            "nombre",
            "apellido",
            "dni",
            "cuit",
            "email",
            "telefono",
            "dominio",
            "anio",
          ].map((field) => (
            <div key={field}>
              <Input
                type={
                  field === "email"
                    ? "email"
                    : field === "telefono"
                    ? "tel"
                    : "text"
                }
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field] || ""}
                onChange={handleChange}
                required
              />
              {error[field] && (
                <p className="text-red-500 text-sm">{error[field]}</p>
              )}
            </div>
          ))}
          <Input
            type="file"
            name="archivoBaja"
            accept=".pdf"
            onChange={handleChange}
            required
          />
          {error.archivoBaja && (
            <p className="text-red-500 text-sm">{error.archivoBaja}</p>
          )}
          <Button
            type="submit"
            disabled={Object.values(error).some((err) => err)}
          >
            Crear Trámite
          </Button>
          {success && <p className="text-green-500 text-sm">{success}</p>}
          {error.general && (
            <p className="text-red-500 text-sm">{error.general}</p>
          )}
        </form>
      </div>
    </>
  );
};

export default TramiteForm;
