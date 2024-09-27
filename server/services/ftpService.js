import ftp from "basic-ftp"; 

async function uploadFile(localFilePath, remoteFileName) {
    const client = new ftp.Client();
    client.ftp.verbose = true; // Para mostrar logs detallados

    try {
        await client.access({
            host: "192.168.0.110",
            user: "user1",
            password: "123",
            secure: true, 
            secureOptions: {
                rejectUnauthorized: false 
            }
        });

        // Sube el archivo local al servidor FTP
        await client.ensureDir("/archivosBaja"); 
        await client.uploadFrom(localFilePath, remoteFileName);
        console.log(`Archivo subido con éxito: ${remoteFileName}`);
    } catch (err) {
        console.error("Error durante la subida del archivo FTP:", err);
        throw err; // Relanza el error para manejarlo en el controlador
    } finally {
        client.close(); // Cierra la conexión FTP
    }
}

export default { uploadFile };