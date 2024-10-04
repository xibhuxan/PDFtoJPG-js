const fs = require('fs');
const path = require('path');
const poppler = require('pdf-poppler');

// Definir las rutas de las carpetas
const pdfFolderPath = path.join(__dirname, 'pdf'); // Carpeta de PDFs
const jpgFolderPath = path.join(__dirname, 'jpg'); // Carpeta de JPGs

// Asegúrate de que la carpeta de destino exista
if (!fs.existsSync(jpgFolderPath)) {
    fs.mkdirSync(jpgFolderPath);
}

const options = {
    format: 'jpeg',
    scale: 2048
};

// Convertir todos los PDFs a imágenes
fs.readdir(pdfFolderPath, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
        const pdfPath = path.join(pdfFolderPath, file);
        if (path.extname(file) === '.pdf') {
            const fileNameWithoutExt = path.parse(file).name; // Nombre del archivo sin extensión
            const outputFilePath = path.join(jpgFolderPath, fileNameWithoutExt); // Ruta del archivo de salida
            
            const convertOptions = {
                ...options,
                out_dir: jpgFolderPath, // Carpeta de salida
                out_prefix: fileNameWithoutExt, // Prefijo del archivo de salida
                page: null // Todas las páginas
            };

            poppler.convert(pdfPath, convertOptions)
                .then(() => console.log(`PDF convertido: ${file}`))
                .catch(err => console.error(`Error al convertir ${file}:`, err));
        }
    });
});
