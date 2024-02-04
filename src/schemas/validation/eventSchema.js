import { object, string } from 'zod'

//ZOD
const eventValidation = object({
    title: string({
        required_error: 'title is required'
    }).min(5).max(150),
    email: string({
        required_error: 'email is required'
    }).refine((value) => {
        // Utiliza una expresión regular para validar si el valor es una dirección de correo electrónico válida
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    }, {
        message: 'Invalid email address',
    }),
    password: string({
        required_error: 'password is required'
    }).min(7)
})

export function checkUser(obj){
    return userValidation.safeParse(obj)
}