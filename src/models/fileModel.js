import Media from '../schemas/db/mediaSchema.js'
import JsonR from './jsonModel.js'
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';
import { S3 } from '../services/s3.js';

import { createWebp } from '../services/webp.js';

class fileModel {
    static async checkIsImage({ file }){
        const extension = path.extname(file.name).toLowerCase();
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];
        return allowedExtensions.includes(extension); //Extension valida
    }

    static async post({ file, user }) {
        try {
            console.log(file);
            const extension = path.extname(file.name).toLowerCase();
            const code = uuidv4().substring(0, 5).replace(/-/g, '');
            const date = new Date();
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const folderPath = `${year}/${month}/${code}`;
            let urls = [];
    
            // Crear las URLs de las imágenes si es una imagen
            if (this.checkIsImage({ file })) {
                const paths = await createWebp({ file });
    
                // Agregar el archivo original
                paths.push({ name: "original", data: file, url: file.tempFilePath });
    
                // Subir los archivos y obtener las URLs
                const uploadPromises = paths.map(async (path) => {
                    const data = await S3.upload({ file: path.data, dir: folderPath, read: true });
                    urls.push({ name: path.name, url: data.url });
    
                    // Eliminar el archivo temporal después de subirlo
                    fs.unlink(path.url, (err) => {
                        if (err) {
                            console.error('Error al eliminar el archivo temporal:', err);
                        }
                    });
                });
    
                await Promise.all(uploadPromises);
            } else {
                // Subir el archivo no es una imagen
                const data = await S3.upload({ file, dir: folderPath, read: true });
                urls.push({ name: "original", url: data.url });
            }
    
            // Crear el documento Media
            const newMedia = new Media({
                author: user.id,
                name: file.name,
                fileType: file.mimetype,
                extension,
                size: file.size,
                urls,
                isPublic: true // Cambiar según sea necesario
            });
    
            const result = await newMedia.save();
            return new JsonR(200, true, 'file-model-post', 'File upload successfully', result);
        } catch (err) {
            console.error('Error:', err);
            return new JsonR(500, false, 'app-model-check', 'Server error', {});
        }
    }
    
}

export default fileModel;