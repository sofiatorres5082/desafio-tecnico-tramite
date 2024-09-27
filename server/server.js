import express from 'express';
import cors from 'cors';
import tramiteRoutes from './routes/tramiteRoutes.js';
import userRoutes from './routes/userRoutes.js';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

// Permite peticiones desde el frontend. 
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // Permite que las cookies se envíen con las solicitudes
}));

// Middleware para manejar cookies
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usa las rutas de trámites bajo el prefijo "/api/tramites"
app.use('/api/tramites', tramiteRoutes); // Prefijo para trámites

// Usa las rutas de usuarios bajo el prefijo "/api/users"
app.use('/api/users', userRoutes);

app.listen(4000, () => {
  console.log('Servidor corriendo en el puerto 4000');
});
