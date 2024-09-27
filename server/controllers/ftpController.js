import ftpService from '../services/ftpService.js';
import fs from 'fs';
import path from 'path';

const tempDir = path.resolve('temp');
if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

async function uploadTramiteFile(req, res) {
    let localFilePath;
    try {
        const file = req.file; // Acá req.file viene de multer
        if (!file) {
            return res.status(400).json({ message: "No se recibió ningún archivo." });
        }

        const remoteFileName = file.originalname; // Nombre original del archivo
        localFilePath = path.join(tempDir, file.originalname); // Ruta local para guardar el archivo temporalmente

        // Guardar el archivo en el servidor
        fs.writeFileSync(localFilePath, file.buffer); // Guarda el archivo

        // Subir el archivo al servidor FTP
        await ftpService.uploadFile(localFilePath, remoteFileName);
        res.status(200).json({ message: "Archivo subido con éxito." });

    } catch (error) {
        console.error("Error al subir el archivo:", error);
        res.status(500).json({ message: "Error al subir el archivo.", error: error.message });
    } finally {
        if (localFilePath && fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath); // Elimina el archivo temporal después de subirlo
        }
    }
}

export default {
    uploadTramiteFile
};
