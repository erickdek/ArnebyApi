const { SECRET_KEY_TOKEN } = process.env;
import jwt from 'jsonwebtoken';

export function createAccessToken(payload){
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            SECRET_KEY_TOKEN,
            { expiresIn: "1d" },
            (err, res) => {
                if(err) return reject(err);
                resolve(res);
            }
        );
    });
}