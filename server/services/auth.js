import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

dotenv.config();

// Usa process.env.JWT_SECRET para acceder a la clave secreta
const secret = process.env.JWT_SECRET; // Utiliza una variable de entorno para la clave secreta

const generateToken = async (user) => {
  return jwt.sign(
    {
      id: user.id_user,
      email: user.email,
      admin: user.admin,
    },
    secret,
    {
      expiresIn: "12h",
    }
  );
};

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (e) {
    return null;
  }
};

const encrypt = async (textPplain) => {
  const hash = await bcrypt.hash(textPplain, 10);
  return hash;
};

const comparePassword = async (passwordPlain, hashPassword) => {
  return await bcrypt.compare(passwordPlain, hashPassword);
};

export { encrypt, comparePassword, generateToken, verifyToken };

