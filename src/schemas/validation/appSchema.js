import { object, string } from 'zod';

// Define una expresión regular para validar URLs
const urlRegExp = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;

// ZOD
const appValidation = object({
    name: string({
        required_error: 'Name is required'
    }).min(1).max(255), // Requerido, de 1 a 255 caracteres
    apptype: string().min(1).max(255), // Debe ser una cadena
    domain: string({
        required_error: 'Domain is required'
    }).regex(urlRegExp, 'Invalid URL'), // Requerido y debe coincidir con la expresión regular
    resume: string().max(250) // Máximo 250 caracteres
});

export function checkAppGen(obj) {
    return appValidation.safeParse(obj);
}
