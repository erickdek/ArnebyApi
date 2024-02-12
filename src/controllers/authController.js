import logger from '../services/logger.js';
import User from '../models/userModel.js';
import JsonR from '../models/jsonModel.js';
import email from '../services/email.js';
import { checkUser, checkUserLogin } from '../schemas/validation/userSchema.js'

/**
 * Method to login a user
 */
export const login = async (req, res) => {
    //Validacion de datos
    const result = await checkUserLogin(req.body)
    //Los datos no coinciden
    if(!result.success){
        return res.status(400).json(new JsonR(400, false, 'auth-controller-login', 'Error consulta', JSON.parse(result.error.message)))
    }
    
    //Consulta del usuario en la base de datos
    try {
        const loginUser = await User.check(req.body);
        
        //En caso de que no exista el usuario
        if (!loginUser.success){
            return res.status(loginUser.status).json(loginUser);
        }
        //Devolvemos token del usuario
        return res.cookie("token", loginUser.data.token, {
            httpOnly: true, // Marcar la cookie como httpOnly para evitar que sea accesible desde JavaScript
            secure: process.env.NODE_ENV === "production", // Solo permitir cookies seguras en producción (HTTPS)
            sameSite: "strict", // Restringir el envío de cookies a peticiones del mismo sitio
            maxAge: 24 * 60 * 60 * 1000, // Duración de la cookie en milisegundos (aquí es de 1 día)
            path: "/", // Ruta en la que la cookie está disponible (aquí es la raíz del sitio)
        }).status(loginUser.status).json(loginUser);
    
    } catch (e) {
        logger.error(e.message);
        return res.status(500).json(new JsonR(500, false, 'auth-controller-login', 'Server error', {}));
    }
};


/**
 * Method for registering a user
 */
export const register = async (req, res) => {
    //Validacion de datos
    const result = await checkUser(req.body)
    //Los datos no coinciden
    if(!result.success){
        return res.status(400).json(new JsonR(400, false, 'auth-controller-register', 'Error consulta', JSON.parse(result.error.message)))
    }

    //Registro del usuario en la base de datos
    try {
        const newUser = await User.set(req.body);
        //En caso de que no exista el usuario
        if(!newUser.success){
            return res.status(400).json(new JsonR(400, false, 'auth-controller-register', JSON.parse(newUser.message), {}));
        }
        //Devolvemos token del usuario
        return res.cookie("token", newUser.data.token, {
            httpOnly: true, // Marcar la cookie como httpOnly para evitar que sea accesible desde JavaScript
            secure: process.env.NODE_ENV === "production", // Solo permitir cookies seguras en producción (HTTPS)
            sameSite: "strict", // Restringir el envío de cookies a peticiones del mismo sitio
            maxAge: 24 * 60 * 60 * 1000, // Duración de la cookie en milisegundos (aquí es de 1 día)
            path: "/", // Ruta en la que la cookie está disponible (aquí es la raíz del sitio)
        }).status(200).json(newUser);
    } catch (e) {
        if (e.code === 11000 && e.keyPattern.email) {
            // El correo electrónico ya está en uso
            return res.status(409).json(new JsonR(409, false, 'auth-controller-register', 'Email already exists', {}));
        }
        logger.error('Error: ' + e.message);
        return res.status(500).json(new JsonR(500, false, 'auth-controller-register', 'Server error', {}));
    }
};


/**
 * Method for get a new password
 */
export const lostpass = async (req, res) => {
    email('erick.gom.marq@gmail.com', 'Lost password arneby', 'Esto es un test');
    return res.status(500).json(new JsonR(500, false, 'auth-controller-register', 'Server error', {}));
};


/**
 * Method for logout a user
 */
export const logout = async (req, res) => {
    res.cookie("token", "", {expires: new Date(0)})
    return res.status(200).json({message: "Logout Success"});
};


/**
 * Method for get data of the current user
 */
export const profile = async (req, res) => {
    try {
        const dataUser = await User.get({id:req.user.id});
        if (!dataUser.success){
            return res.status(400).json(dataUser);
        }
        return res.status(200).json(dataUser);
    } catch (e) {
        logger.error("Error: " + e);
        return res.status(500).json(new JsonR(500, false, 'auth-constroller-profile', 'Internal Server Error', {}));
    }
};