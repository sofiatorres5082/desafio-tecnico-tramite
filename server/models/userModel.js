import { Sequelize } from "sequelize";

export const db = new Sequelize("municipalidad", "root", "admin", {
  dialect: "mysql",
  host: "localhost",
});

export const userModel = db.define(
  "users",
  {
    id_user: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [6, 100],
      },
    },
    admin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false,
  }
);

// Método para verificar la contraseña en el login
userModel.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Sincronización del modelo con la base de datos
db.sync({ alter: true })
  .then(() => {
    console.log(
      'La tabla "users" ha sido creada y sincronizada correctamente.'
    );
  })
  .catch((error) => {
    console.error('Error al sincronizar la tabla "users":', error);
  });
