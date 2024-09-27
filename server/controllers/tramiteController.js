import path from "path";
import { fileURLToPath } from "url";
import { tramiteModel } from "../models/tramiteModel.js";
import ftpService from "../services/ftpService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Obtiene todos los trámites de un usuario autenticado
export const getTramites = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Usuario no autenticado" });
    }

    if (req.user.admin) {
      // Administrador puede ver todos los trámites
      const tramites = await tramiteModel.findAll();
      res.json(tramites);
    } else {
      // Usuario normal puede ver solo sus trámites
      const tramites = await tramiteModel.findAll({
        where: { userId: req.user.id },
      });
      res.json(tramites);
    }
  } catch (error) {
    console.error("Error al obtener los trámites:", error);
    res
      .status(500)
      .json({ message: "Error al obtener los trámites", error: error.message });
  }
};

// Crea un trámite.
export const createTramite = async (req, res) => {
  try {
    const { nombre, apellido, dni, cuit, email, telefono, dominio, anio, estado } = req.body;

    // Verificar autenticación
    if (!req.user) {
      return res.status(401).json({ message: "No tienes autorización para realizar esta acción." });
    }

    // Verificar si el usuario ya tiene un trámite pendiente
    const tramitePendiente = await tramiteModel.findOne({
      where: { userId: req.user.id, estado: "Pendiente" },
    });

    if (tramitePendiente) {
      return res.status(400).json({ message: "Ya tiene un trámite pendiente." });
    }

    // Subida del archivo y lógica de FTP
    const archivoBaja = req.file.filename;
    const localFilePath = path.join(__dirname, "../temp", archivoBaja);
    const remoteFileName = archivoBaja;

    await ftpService.uploadFile(localFilePath, remoteFileName);

    // Crear el nuevo trámite en la base de datos
    const nuevoTramite = await tramiteModel.create({
      userId: req.user.id,
      nombre,
      apellido,
      dni,
      cuit,
      email,
      telefono,
      dominio,
      anio,
      archivoBaja: `ftp://192.168.0.110/archivosBaja/${remoteFileName}`,
      estado,
    });

    res.status(201).json(nuevoTramite);
  } catch (error) {
    console.error("Error al crear el trámite:", error);
    res.status(500).json({ message: "Error al crear el trámite", error: error.message });
  }
};

// Actualiza un trámite
export const updateTramite = async (req, res) => {
  try {
    const { id } = req.params;
    const tramite = await tramiteModel.findByPk(id);

    console.log(id);

    if (!tramite)
      return res.status(404).json({ message: "Trámite no encontrado" });

    if (req.user.admin || tramite.userId === req.user.id) {
      const [updated] = await tramiteModel.update(req.body, {
        where: { id_tramite: id },
      });
      if (updated) {
        const updatedTramite = await tramiteModel.findByPk(id);
        res.status(200).json(updatedTramite);
      } else {
        res.status(404).json({ message: "Trámite no encontrado" });
      }
    } else {
      res
        .status(403)
        .json({ message: "No tienes permiso para actualizar este trámite" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

