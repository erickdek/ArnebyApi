import UserDB from '../schemas/db/userSchema.js'
import AppsDB from '../schemas/db/appSchema.js'
import PostDB from '../schemas/db/postSchema.js'
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
            username: userFound.username, 
            email: userFound.email
        });
    }

    static async get({ id }) {
        const userFound = await UserDB.findById(id);
    
        if (!userFound) return new JsonR(404, false, 'user-model-check', 'User not found', {});
    
        // Obtener el total de aplicaciones del usuario
        const totalApps = await AppsDB.countDocuments({ userid: userFound._id });
    
        // Obtener el total de publicaciones del usuario
        const totalPosts = await PostDB.countDocuments({ userid: userFound._id });
    
        // Obtener todas las aplicaciones creadas por el usuario
        
        const userApps = await AppsDB.find({ userid: userFound._id })
        .select('name apptype appid updatedAt domain') // Selecciona los campos deseados
        .sort({ updatedAt: -1 });

        return new JsonR(200, true, 'user-model-get', 'Authorization successful', {
            user: {
                id: userFound._id,
                username: userFound.username,
                email: userFound.email,
                credits: userFound.credits,
                balance: userFound.balance,
                role: userFound.role,
                created_at: userFound.createdAt,
                updated_at: userFound.updatedAt,
                apps: totalApps,
                posts: totalPosts
            },
            apps:userApps
        });
    }
}

export default UserModel;