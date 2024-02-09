import UserDB from '../schemas/db/userSchema.js'
import EventDB from '../schemas/db/eventSchema.js'
import bcryptjs from 'bcryptjs'
import JsonR from '../models/jsonModel.js'

import { createAccessToken } from '../services/jwt.js'

class UserModel{
    static async set({ name, lastname, email, password }){
        const passwordhash = await bcryptjs.hash(password, 10);
        
        const newUser = new UserDB({
            name,
            lastname,
            email,
            password: passwordhash
        });
        const saveUser = await newUser.save();
        const token = await createAccessToken({id: saveUser._id});
        return new JsonR(200, true, 'auth-controller-login', 'Register Success', {
            token: token,
            id: saveUser._id,
            name: newUser.name,
            lastname: newUser.lastname,
            email: newUser.email
        })
    }

    static async check({email, password }){
        const userFound = await UserDB.findOne({ email })
        if (!userFound) return new JsonR(400, false, 'user-model-check', 'Email or password incorrect', {});

        const isMatch = await bcryptjs.compare(password, userFound.password);
        if (!isMatch) return new JsonR(400, false, 'user-model-check', 'Email or password incorrect', {});

        const token = await createAccessToken({id: userFound._id});
        return new JsonR(200, true, 'user-model-check', 'Login successful', {
            token: token, 
            id: userFound._id, 
            name: userFound.name,
            lastname: userFound.lastname, 
            email: userFound.email
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