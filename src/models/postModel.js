import PostDB from '../schemas/db/postSchema.js'
import JsonR from '../models/jsonModel.js'

export class aiPost {
    static async get({ appid }){
        
    }

    static async getById({ appid, postid }){
        
    }

    static async set({appname, userid}){
        try {

        } catch (err) {
            return new JsonR(500, false, 'post-model-set', 'Internal Server Error', {});
        }
    }

    static async put({appid, input}){
        
    }

    static async del({ appid, postid }){
        
    }
}