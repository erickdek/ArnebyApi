import User from '../models/userModel.js';
import JsonR from '../models/jsonModel.js'

export const authRequiredAdmin = (req, res, next) => {
    const user = User.get(req.user.id);
    if (!user || user.role != 'admin') {
        return res.status(403).json(new JsonR(403, false, 'validate-key', 'Unauthorized', {}));
    }
    req.user.role = 'admin';
    next();
}