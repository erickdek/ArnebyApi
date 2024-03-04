import JsonR from '../models/jsonModel.js'

export const authRequiredAdmin = (req, res, next) => {
    const user = req.token;
    if (!user || user.role !== 'admin') {
        return res.status(403).json(new JsonR(403, false, 'validate-key', 'Unauthorized', {}));
    }
    next();
}