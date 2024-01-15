import App from '../schemas/db/appSchema.js'
import JsonR from '../models/jsonModel.js'

export const authRequiredKey = (req, res, next) => {
    const appid = req.cookies.appid || req.query.appid || req.body.appid;
    const secretkey = req.cookies.secretkey || req.query.secretkey || req.body.secretkey;
    
    if (!appid || !secretkey) {
        return res.status(400).json(new JsonR(400, false, 'validate-key', 'Required appid and secretkey', {}));
    }

    try {
        const checkApp = App.get(appid, secretkey);
        if(!checkApp.success) {
            return res.status(401).json(new JsonR(401, false, 'validate-key', 'Invalid appid or secretkey', {}));
        }
        req.myapp = checkApp;
        next();
    } catch (err) {
        return res.status(500).json(new JsonR(500, false, 'validate-key', 'Server Error', {}));
    }
}