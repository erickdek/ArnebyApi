const { SECRET_KEY_TOKEN } = process.env;
import jwt from 'jsonwebtoken';

export const authNotLogin = (req, res, next) => {
    const token = req.cookies.token;
    
    if (token) {
        jwt.verify(token, SECRET_KEY_TOKEN, (err, user) => {
            if (!err) {
                // Usuario logueado y token válido, redirigir a 'panel'
                return res.redirect('panel');
            }
        });
    }

    // Usuario no logueado o token inválido, permitir que continúen o redirigirlos a la página de inicio de sesión
    next();
}