import sharp from 'sharp';
import fs from 'fs/promises';
import { IMAGE_SIZES } from '../../config.js';


export async function createWebp({ file, sizes = IMAGE_SIZES }) {
    try {
        const imageBuffer = await fs.readFile(file.tempFilePath); // Leer la imagen original

        const imageUrls = await Promise.all(sizes.map(async (size) => {
            const outputFilePath = `${file.tempFilePath}_${size.width}x${size.height}`;

            // Redimensionar y convertir la imagen a WebP
            await sharp(imageBuffer)
                .resize(size.width, size.height, { fit: 'cover', withoutEnlargement: true })
                .webp()
                .toFile(outputFilePath);

            const tempfile = { ...file };
            tempfile.name = `${file.name}_${size.width}x${size.height}.webp`;

            return { name: size.name, data: tempfile, url: outputFilePath };
        }));

        return imageUrls; // Devolver todas las dimensiones y URLs de las imágenes generadas
    } catch (error) {
        throw error; // Lanzar el error para que sea manejado por el código que llame a esta función
    }
}
