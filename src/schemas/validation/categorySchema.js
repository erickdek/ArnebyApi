import { object, string } from 'zod';

const postCategory = object({
    name: string().min(1, { message: "El nombre es requerido." }),
    description: string().min(1, { message: "La descripción es requerida." }),
});

const CategoryIdSchema = object({
    id: string()
        .length(24, { message: "El ID debe tener una longitud de 24 caracteres." })
        .regex(/^[0-9a-fA-F]{24}$/, { message: "El ID debe ser una cadena hexadecimal de 24 caracteres." }),
});

const Categoryname = object({
    name: string().min(1, { message: "El nombre es requerido." }),
});

const Categorydescription = object({
    description: string().min(1, { message: "La descripción es requerida." }),
});

const Categoryslug = object({
    slug: string().min(1, { message: "El slug es requerido." }),
});


export function checkCategory(obj) {
    return postCategory.safeParse(obj);
}
export function checkNameCategory(obj) {
    return Categoryname.safeParse(obj);
}
export function checkSlugCategory(obj) {
    return Categoryslug.safeParse(obj);
}
export function checkDescriptionCategory(obj) {
    return Categorydescription.safeParse(obj);
}
export function checkIdCategory(obj) {
    return CategoryIdSchema.safeParse(obj);
}