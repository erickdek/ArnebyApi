import { object, string } from 'zod'

// ZOD - Registro
const userValidation = object({
    name: string({
        required_error: 'El nombre es requerido.',
    }).min(1, {
        message: 'El nombre debe tener al menos 1 caracter.',
    }).max(30, {
        message: 'El nombre no debe exceder los 30 caracteres.',
    }).refine((value) => {
        // Utiliza una expresión regular para validar que solo se permitan letras acentuadas, la letra ñ y números
        return /^[A-Za-záéíóúÁÉÍÓÚñÑ0-9\s]+$/i.test(value);
    }, {
        message: 'El nombre solo debe contener letras, números y espacios.',
    }),

    lastname: string({
        required_error: 'El apellido es requerido.',
    }).min(1, {
        message: 'El apellido debe tener al menos 1 caracter.',
    }).max(30, {
        message: 'El apellido no debe exceder los 30 caracteres.',
    }).refine((value) => {
        // Utiliza una expresión regular para validar que solo se permitan letras acentuadas, la letra ñ y números
        return /^[A-Za-záéíóúÁÉÍÓÚñÑ0-9\s]+$/i.test(value);
    }, {
        message: 'El apellido solo debe contener letras, números y espacios.',
    }),

    email: string({
        required_error: 'El correo electrónico es requerido.',
    }).refine((value) => {
        // Utiliza una expresión regular para validar si el valor es una dirección de correo electrónico válida
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    }, {
        message: 'Dirección de correo electrónico inválida.',
    }),

    password: string({
        required_error: 'La contraseña es requerida.',
    }).min(8, {
        message: 'La contraseña debe tener al menos 8 caracteres.',
    })
});


// ZOD - Inicio de sesión
const userLoginValidation = object({
    email: string({
        required_error: 'El correo electrónico es requerido.'
    }).refine((value) => {
        // Utiliza una expresión regular para validar si el valor es una dirección de correo electrónico válida
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    }, {
        message: 'Dirección de correo electrónico inválida.',
    }),

    password: string({
        required_error: 'La contraseña es requerida.',
    }).refine((value) => {
        // Verifica si la longitud de la contraseña es al menos 8 caracteres
        return value.length >= 8;
    }, {
        message: 'La contraseña debe tener al menos 8 caracteres.',
    })
});

// ZOD - Recuperación de contraseña perdida
const userLostPasswordValidation = object({
    email: string({
        required_error: 'El correo electrónico es requerido.'
    }).refine((value) => {
        // Utiliza una expresión regular para validar si el valor es una dirección de correo electrónico válida
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    }, {
        message: 'Dirección de correo electrónico inválida.',
    })
});

// ZOD - Password
const userPasswordValidation = object({
    token: string({
        required_error: "El token es requerido."
    }),
    password: string({
        required_error: 'La contraseña es requerida.',
    }).refine((value) => {
        // Verifica si la longitud de la contraseña es al menos 8 caracteres
        return value.length >= 8;
    }, {
        message: 'La contraseña debe tener al menos 8 caracteres.',
    })
});



export function checkUser(obj){
    return userValidation.safeParse(obj)
}

export function checkUserLogin(obj){
    return userLoginValidation.safeParse(obj)
}

export function checkUserRescue(obj){
    return userLostPasswordValidation.safeParse(obj)
}

export function checkChangePassword(obj){
    return userPasswordValidation.safeParse(obj)
}