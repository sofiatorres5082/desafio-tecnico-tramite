const validateSchema = (schema) => (req, res, next) => {
  try {
    const body = {
      ...req.body,
      archivoBaja: req.file,
    };

    schema.parse(body);

    // Validar el archivo
    if (req.file) {
      // Validar el tipo
      if (req.file.mimetype !== "application/pdf") {
        return res.status(400).json({ message: "El archivo debe ser un PDF" });
      }

      // Validar el tamaño
      if (req.file.size > 15 * 1024 * 1024) {
        return res
          .status(400)
          .json({ message: "El archivo no debe superar los 15MB" });
      }
    } else {
      return res.status(400).json({ message: "El archivo es requerido" });
    }

    next();
  } catch (error) {
    return res.status(400).json({ error: error.errors.map(error => error.message)});
  }
};

export default validateSchema;
