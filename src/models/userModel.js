import UserDB from '../schemas/db/userSchema.js'
import EventDB from '../schemas/db/eventSchema.js'
import bcryptjs from 'bcryptjs'
import JsonR from '../models/jsonModel.js'

import { createAccessToken } from '../services/jwt.js'

class UserModel{
    static async set({ name, lastname, email, password }){

        //Encriptamos la contrasena
        const passwordhash = await bcryptjs.hash(password, 10);

        //Pasamos los parametros a guardar
        const newUser = new UserDB({
            name,
            lastname,
            email,
            password: passwordhash
        });
        const saveUser = await newUser.save();

        //Creamos el Token
        const token = await createAccessToken({
            id: saveUser._id,
            email: saveUser.email
        });

        //Devolvemos los datos
        return new JsonR(200, true, 'auth-controller-login', 'Register Success', {
            user: {
                id: saveUser._id,
                name: saveUser.name,
                lastname: saveUser.lastname,
                email: saveUser.email,
                role: saveUser.role,
                avatar: saveUser.avatar,
            },
            token: token
        })
    }

    static async check({email, password }){
        const userFound = await UserDB.findOne({ email })
        if (!userFound) return new JsonR(400, false, 'user-model-check', 'Email or password incorrect', {});

        //Si la contrasena es igual a la guardada
        const isMatch = await bcryptjs.compare(password, userFound.password);
        if (!isMatch) return new JsonR(400, false, 'user-model-check', 'Email or password incorrect', {});

        //Creamos el token
        const token = await createAccessToken({
            id: userFound._id,
            email: userFound.email
        });

        //Devolvemos los datos
        return new JsonR(200, true, 'user-model-check', 'Login successful', {
            user: {
                id: userFound._id,
                name: userFound.name,
                lastname: userFound.lastname,
                email: userFound.email,
                role: userFound.role,
                avatar: userFound.avatar,
            },
            token: token
        });
    }

    static async get({ id }) {
        const userFound = await UserDB.findById(id);
    
        if (!userFound) return new JsonR(404, false, 'user-model-check', 'User not found', {});
    
        // Obtener el total de aplicaciones del usuario
        const totalEvents = await EventDB.countDocuments({ organizer: userFound._id });
        
        const userEvents = await EventDB.find({ organizer: userFound._id })
        .select('title slug content location updatedAt') // Selecciona los campos deseados
        .sort({ updatedAt: -1 });

        return new JsonR(200, true, 'user-model-get', 'Authorization successful', {
            user: {
                id: userFound._id,
                name: userFound.name,
                lastname: userFound.lastname,
                email: userFound.email,
                role: userFound.role,
                avatar: userFound.avatar,
                created_at: userFound.createdAt,
                updated_at: userFound.updatedAt,
            },
            events: {
                numTotal: totalEvents,
                userEvents
            }
        });
    }
}

export default UserModel;