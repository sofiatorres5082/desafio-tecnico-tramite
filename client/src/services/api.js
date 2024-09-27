import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", 
  withCredentials: true, // Esto permite que las cookies se envíen automáticamente con las solicitudes
});

// Función para iniciar sesión
export const login = async (email, password) => {
  try {
    const response = await api.post("/users/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error en la autenticación:", error);
    throw error;
  }
};

// Función para registrar un usuario
export const register = async (name, lastName, email, password) => {
  try {
    const response = await api.post("/users/registrar", {
      name,
      lastName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw error;
  }
};

// Función para cerrar sesión
export const logout = async () => {
  try {
    const response = await api.post("/users/logout");
    return response.data; 
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    throw error;
  }
};

// Función para crear un trámite
export const createTramite = async (
  nombre,
  apellido,
  dni,
  cuit,
  email,
  telefono,
  dominio,
  anio,
  archivoBaja, 
  estado
) => {
  try {
    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("apellido", apellido);
    formData.append("dni", dni);
    formData.append("cuit", cuit);
    formData.append("email", email);
    formData.append("telefono", telefono);
    formData.append("dominio", dominio);
    formData.append("anio", anio);
    formData.append("archivoBaja", archivoBaja); 
    formData.append("estado", estado);

    const response = await api.post("/tramites/tramite", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 400) {
      return { errors: error.response.data.errors };
    } else {
      throw error;
    }
  }
};

// Función para obtener trámites
export const getTramites = async () => {
  try {
    const response = await api.get("/tramites");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los trámites:", error);
    throw error;
  }
};

// Función para actualizar el trámite
export const updateTramite = async (id_tramite, updatedData) => {
  try {
    const response = await api.put(`/tramites/${id_tramite}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el trámite:", error);
    throw error;
  }
};
