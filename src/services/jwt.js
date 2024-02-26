const { SECRET_KEY_TOKEN } = process.env;
import jwt from 'jsonwebtoken';

export function createAccessToken(payload, time = "1d"){
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            SECRET_KEY_TOKEN,
            { expiresIn: time },
            (err, res) => {
                if(err) return reject(err);
                resolve(res);
            }
        );
    });
}