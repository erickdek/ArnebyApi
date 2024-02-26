import logger from '../services/logger.js';
import User from '../models/userModel.js';
import JsonR from '../models/jsonModel.js';
import email from '../services/email.js';
import { createAccessToken as newJWT } from '../services/jwt.js'
import { checkUser, checkUserLogin, checkUserRescue } from '../schemas/validation/userSchema.js'

//Email Templates
import newPassTemplate from '../views/emails/newpass.js';

/**
 * Method to login a user
 */
export const login = async (req, res) => {
    //Validacion de datos
    const result = checkUserLogin(req.body)
    //Los datos no coinciden
    if(!result.success){
        return res.status(400).json(new JsonR(400, false, 'login-data-validation', 'Error con los datos enviados', JSON.parse(result.error.message)))
    }
    
    //Consulta del usuario en la base de datos
    try {
        const loginUser = await User.check(req.body);
        
        //En caso de que no exista el usuario
        if (!loginUser.success){
            return res.status(loginUser.status).json(loginUser);
        }
        //Devolvemos token del usuario
        return res.cookie("token", loginUser.data.token, { domain: '.arneby.com' }).status(loginUser.status).json(loginUser);
    
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
    const result = checkUser(req.body)
    //Los datos no coinciden
    if(!result.success){
        return res.status(400).json(new JsonR(400, false, 'register-data-validation', 'Error con los datos enviados', JSON.parse(result.error.message)))
    }

    //Registro del usuario en la base de datos
    try {
        const newUser = await User.set(req.body);
        //En caso de que no exista el usuario
        if(!newUser.success){
            return res.status(400).json(new JsonR(400, false, 'auth-controller-register', JSON.parse(newUser.message), {}));
        }
        //Devolvemos token del usuario
        return res.cookie("token", newUser.data.token, { domain: '.arneby.com' }).status(200).json(newUser);
    } catch (e) {
        if (e.code === 11000 && e.keyPattern.email) {
            // El correo electrónico ya está en uso
            return res.status(409).json(new JsonR(409, false, 'auth-controller-register', 'Email already exists', {}));
        }
        logger.error('Error: ' + e.message);
        return res.status(500).json(new JsonR(500, false, 'auth-controller-register', 'Server error', {}));
    }
};

export const newpassword = async (req, res) => {
    
}

/**
 * Method for get a new password
 */
export const lostpass = async (req, res) => {
    //Validacion de datos
    const result = checkUserRescue(req.body);

    //Los datos no coinciden
    if(!result.success){
        return res.status(400).json(new JsonR(400, false, 'lastpassword-data-validation', 'Error con los datos enviados', JSON.parse(result.error.message)))
    }

    //Registro de un Token para un nuevo password
    try {
        const userData = await User.checkEmail(req.body);
        //En caso de que no exista el usuario
        if(!userData.success){
            return res.status(userData.status).json(new JsonR(userData.status, userData.success, 'auth-controller-lostpass', userData.msg, {}));
        }

        //Creamos un token para un nuevo password
        const token = await newJWT({
            motive: 'new-password',
            id: userData.data.user._id,
            email: userData.data.user.email
        }, '10m');

        const url = `${process.env.FRONTEND_URL}/new-password/${token}`;
        const emailContent = newPassTemplate(url);

        email(userData.data.user.email, "Recuperar Contraseña - Arneby", emailContent);
        logger.info('Froget-password to: '+req.body.email);
        //Devolvemos token del usuario
        return res.status(userData.status).json(new JsonR(userData.status, true, 'auth-controller-lostpass', 'Se envio un email para recuperar la contraseña', {}));

    } catch (e) {
        logger.error('Error: ' + e);
        return res.status(500).json(new JsonR(500, false, 'auth-controller-lostpass', 'Server error', {}));
    }
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