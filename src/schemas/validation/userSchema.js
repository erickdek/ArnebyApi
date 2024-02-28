import { object, string } from 'zod'

//ZOD - Register
const userValidation = object({
    name: string({
        required_error: 'name is required'
    }).min(5).max(25),


    lastname: string({
        required_error: 'lastname is required'
    }).min(5).max(25),


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


//ZOD - Login
const userLoginValidation = object({
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
    })
})

//ZOD - Lost Password
const userLostPasswordValidation = object({
    email: string({
        required_error: 'email is required'
    }).refine((value) => {
        // Utiliza una expresión regular para validar si el valor es una dirección de correo electrónico válida
        return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    }, {
        message: 'Invalid email address',
    })
})

//ZOD - Password
const userPasswordValidation = object({
    token: string({
        required_error: 'token is required'
    }),
    password: string({
        required_error: 'password is required'
    })
})


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