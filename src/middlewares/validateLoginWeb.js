const { SECRET_KEY_TOKEN } = process.env;
import jwt from 'jsonwebtoken';

export const authLogin = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, SECRET_KEY_TOKEN, (err, user) => {
        if(err) return res.redirect('/login');
        req.user = user;
        next();
    });
}