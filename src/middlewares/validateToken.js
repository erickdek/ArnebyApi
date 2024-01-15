const { SECRET_KEY_TOKEN } = process.env;
import jwt from 'jsonwebtoken';
import JsonR from '../models/jsonModel.js'

export const authRequired = (req, res, next) => {
    const token = req.cookies.token || req.query.token || req.body.token;

    if (!token) {
        return res.status(400).json(new JsonR(400, false, 'validate-token', 'Token is required', {}));
    }

    jwt.verify(token, SECRET_KEY_TOKEN, (err, user) => {
        if(err) return res.status(401).json(new JsonR(401, false, 'validate-token', 'Invalid Token', {}));
        req.user = user;
        next();
    });
}