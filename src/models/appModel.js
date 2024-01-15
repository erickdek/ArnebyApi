import App from '../schemas/db/appSchema.js'
import crypto from 'node:crypto';
import JsonR from '../models/jsonModel.js'

class appModel{
    static async check({appid, secretkey}){
        try {
            const AppFind = await App.findOne({ appid, secretkey, appban: false });
            if (!AppFind) {
                return new JsonR(404, false, 'app-model-check', 'App not found', {});
            }

            return new JsonR(200, true, 'app-model-check', 'App found successfully', {
                id: AppFind._id,
                name: AppFind.name,
                domain: AppFind.domain,
                apptype: AppFind.apptype,
                resume: AppFind.resume,

            });
        } catch (err) {
            return new JsonR(500, false, 'app-model-check', 'Server error', {});
        }
    }

    static async set({userid, name, domain, apptype, resume}){
        try {
            const appid = await crypto.randomBytes(16).toString('hex');
            const secretkey = await crypto.randomUUID();

            const newApp = new App({
                appid: appid,
                appkey: secretkey,
                userid: userid,
                name,
                domain,
                apptype,
                resume
            })

            const saveApp = await newApp.save();
            return new JsonR(200,true,'app-model-set','App creada correctamente', saveApp);
        } catch (err) {
            return new JsonR(500, false, 'app-model-set', 'Server error', {});
        }
    }

    static async get({ userid }){
        try {
            const AppFind = await App.find({
                userid: userid,
            })
            if(!AppFind) return new JsonR(404, false, 'app-model-get', 'App not found', {});
    
            return new JsonR(200,true,'app-model-get','App found successfully', AppFind);
        } catch (err) {
            return new JsonR(500, false, 'app-model-set', 'Server error', {});
        }
    }

    static async delete({ userid, id }) {
        try {
            const AppFind = await App.findOneAndDelete({ _id: id, userid: userid });
            if (!AppFind) {
                return new JsonR(404, false, 'app-model-delete', 'App not found', {});
            }
            return new JsonR(200, true, 'app-model-delete', 'App deleted successfully', AppFind);

        } catch (err) {
            return new JsonR(500, false, 'app-model-delete', 'Server error', {});
        }
    }

    static async update({ userid, id, domain, apptype, resume }) {
        try {
            // Crea un objeto con los campos que se pueden actualizar
            const updateFields = {};
            if (domain) updateFields.domain = domain;
            if (apptype) updateFields.apptype = apptype;
            if (resume) updateFields.resume = resume;
        
            // Realiza la actualización solo si se proporcionan campos válidos
            if (Object.keys(updateFields).length === 0)
                return new JsonR(400, false, 'app-model-update', 'No valid fields provided for update', {});
        
            // Realiza la actualización del documento
            const updatedApp = await App.findOneAndUpdate(
                { _id: id, userid: userid },
                updateFields,
                { new: true }
            );
        
            if (!updatedApp)
                return new JsonR(404, false, 'app-model-update', 'App not found or not authorized to update', {});
    
            return new JsonR(200, true, 'app-model-update', 'App updated successfully', updatedApp);

        } catch (err) {
            return new JsonR(500, false, 'app-model-delete', 'Server error', {});
        }
    }
}

export default appModel;