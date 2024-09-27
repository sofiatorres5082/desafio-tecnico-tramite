import { encrypt, comparePassword, generateToken } from "../services/auth.js";
import { userModel } from "../models/userModel.js"; 

// Registro de nuevo usuario
export const createUser = async (req, res) => {
  try {
    const { name, lastName, email, password, admin } = req.body;

    // Verifica si el email ya existe
    const existingUser = await userModel.findOne({ where: { email } });
    if (existingUser) {
      return res
        .status(400)
        .json({
          error: "EMAIL_ALREADY_EXISTS",
          message: "El email ya está en uso.",
        });
    }

    const hashedPassword = await encrypt(password);
    if (!hashedPassword) {
      throw new Error("Error al hashear la contraseña");
    }

    const newUser = await userModel.create({
      name,
      lastName,
      email,
      password: hashedPassword,
      admin,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res
      .status(500)
      .json({
        error: "SERVER_ERROR",
        message: "Error al crear el usuario, inténtelo de nuevo.",
      });
  }
};

// Login de usuario
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Verificar la contraseña usando el servicio comparePassword
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Generar el token de sesión usando el servicio generateToken
    const tokenSession = await generateToken(user);

    // Enviar la cookie con el token
    res.cookie("token", tokenSession, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // 'true' en producción
      maxAge: 24 * 60 * 60 * 1000, // 1 día
      sameSite: "Strict",
    });

    // Responder con el usuario y el token
    res.status(200).json({
      data: user,
      tokenSession,
      admin: user.admin,
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res
      .status(500)
      .json({ message: "Error al iniciar sesión", error: error.message });
  }
};

// Logout de usuario
export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // 'true' en producción
      expires: new Date(0), // Expira la cookie inmediatamente
      sameSite: "Strict",
    });
    console.log("Cookie eliminada"); // Agrega esto para verificar
    res.status(200).json({ message: "Cierre de sesión exitoso" });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    res.status(500).json({ message: "Error al cerrar sesión" });
  }
};
