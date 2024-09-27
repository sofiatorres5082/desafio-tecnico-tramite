import { Sequelize } from "sequelize";
import { db } from "./userModel.js"; 

const EstadoTramite = {
  PENDIENTE: "Pendiente",
  APROBADO: "Aprobado",
  RECHAZADO: "Rechazado",
  EN_PROCESO: "En Proceso",
};

export const tramiteModel = db.define(
  "tramites",
  {
    id_tramite: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id_user",
      },
      onUpdate: "CASCADE", // Actualiza las claves foráneas si el `userId` cambia
      onDelete: "CASCADE", // Elimina los trámites si el usuario es eliminado
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    apellido: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    dni: {
      type: Sequelize.STRING(8), // DNI con exactamente 8 caracteres
      allowNull: false,
      unique: true, // Asegura que el DNI sea único en la base de datos
      validate: {
        isInt: true,
        len: [8, 8], // Asegura que el DNI tenga exactamente 8 caracteres
      },
    },
    cuit: {
      type: Sequelize.STRING(11),
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true, // Asegura que el email sea único en la base de datos
      validate: {
        isEmail: true, // Valida el formato del email
      },
    },
    telefono: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        is: /^[0-9]+$/, // Solo números
        len: [7, 15], // Longitud típica de números de teléfono
      },
    },
    dominio: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    anio: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
      },
    },
    archivoBaja: {
      type: Sequelize.STRING, // Ruta del archivo en el servidor FTP
      allowNull: false,
    },
    estado: {
      type: Sequelize.ENUM(...Object.values(EstadoTramite)),
      defaultValue: EstadoTramite.PENDIENTE,
    },
    comentario: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: true, // Esto añadirá los campos createdAt y updatedAt
  }
);

// Sincronización del modelo con la base de datos
db.sync({ alter: true }) 
  .then(() => {
    console.log(
      'La tabla "tramites" ha sido creada y sincronizada correctamente.'
    );
  })
  .catch((error) => {
    console.error('Error al sincronizar la tabla "tramites":', error);
  });
