import { db } from "../models/userModel.js"; // Ajusta la ruta según tu estructura
import { userModel } from "../models/userModel.js";
import { tramiteModel } from "../models/tramiteModel.js";
import { encrypt } from "../services/auth.js"; // Asegúrate de ajustar la ruta

const seedDatabase = async () => {
  try {
    await db.sync({ force: true }); // Esto elimina todas las tablas y las vuelve a crear
    console.log("Database synced");

    // Hashear las contraseñas antes de crear los usuarios
    const adminPassword = await encrypt("administrador");
    const userPassword = await encrypt("hashed_password");

    // Crear un administrador
    await userModel.create({
      name: "Admin",
      lastName: "User",
      email: "admin@example.com",
      password: adminPassword, // Contraseña hasheada
      admin: true,
    });

    // Crear un usuario regular
    await userModel.create({
      name: "Juan",
      lastName: "Pérez",
      email: "juan.perez@example.com",
      password: userPassword, // Contraseña hasheada
      admin: false,
    });

    // Insertar datos en la tabla tramites
    await tramiteModel.create({
      userId: 2, // Asegúrate de que este ID corresponda al usuario correcto
      nombre: "Juan",
      apellido: "Pérez",
      dni: "12345678",
      cuit: "20345678901",
      email: "juan.perez@example.com",
      telefono: "123456789",
      dominio: "ABC123",
      anio: 2022,
      archivoBaja: "archivo.pdf",
      estado: "Pendiente",
      comentario: "Comentario de prueba",
    });

    console.log("Data seeded");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    process.exit();
  }
};

seedDatabase();
