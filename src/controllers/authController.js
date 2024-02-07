import User from '../models/userModel.js'
import JsonR from '../models/jsonModel.js'
import { checkUser, checkUserLogin } from '../schemas/validation/userSchema.js'

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
            return res.status(400).json(loginUser);
        }
        //Devolvemos token del usuario
        return res.cookie("token", loginUser.data.token).status(200).json(loginUser);
    
    } catch (e) {
        return res.status(500).json(new JsonR(500, false, 'auth-controller-login', 'Server error', {}));
    }
};

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
        return res.cookie("token", newUser.data.token).status(200).json(newUser);
    } catch (e) {
        if (e.code === 11000 && e.keyPattern.email) {
            // El correo electrónico ya está en uso
            return res.status(409).json(new JsonR(409, false, 'auth-controller-register', 'Email already exists', {}));
        }
        return res.status(500).json(new JsonR(500, false, 'auth-controller-register', 'Server error', {}));
    }
};

export const lostpass = async (req, res) => {
    res.status(400).json({message: "User not found"});
};

export const logout = async (req, res) => {
    res.cookie("token", "", {expires: new Date(0)})
    return res.status(200).json({message: "Logout Success"});
};

export const profile = async (req, res) => {
    try {
        const dataUser = await User.get({id:req.user.id});
        if (!dataUser.success){
            return res.status(400).json(dataUser);
        }
        return res.status(200).json(dataUser);
    } catch (e) {
        return res.status(500).json(new JsonR(500, false, 'auth-constroller-profile', 'Internal Server Error', {}));
    }
};