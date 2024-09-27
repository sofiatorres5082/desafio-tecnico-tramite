import { verifyToken } from "../services/auth.js";
import { userModel } from "../models/userModel.js";

const authenticateToken = async (req, res, next) => {
  try {
    // Cambia para obtener el token desde la cookie
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "No se proporcionó un token" });
    }

    const tokenData = await verifyToken(token);
    console.log(tokenData);

    if (tokenData.id) {
      req.user = tokenData;
      next();
    } else {
      res.status(403).json({ error: "No posees permisos para acceder" });
    }
  } catch (e) {
    console.error("Error al verificar el token:", e);
    res.status(403).json({ error: "Token inválido o expirado" });
  }
};

// Este middleware verifica si el usuario es un administrador.
const authenticateAdmin = () => async (req, res, next) => {
  try {
    // Cambia para obtener el token desde la cookie
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ error: "No se proporcionó un token" });
    }

    const tokenData = await verifyToken(token);
    const userData = await userModel.findByPk(tokenData.id);

    if (!userData) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Verifica si el usuario es administrador
    if (userData.admin) {
      next(); // Si es administrador, continúa con la siguiente función del middleware
    } else {
      res.status(403).json({ error: "No tienes permisos de administrador" });
    }
  } catch (e) {
    console.error("Error al verificar el token:", e);
    res.status(403).json({ error: "Token inválido o expirado" });
  }
};

export { authenticateToken, authenticateAdmin };
