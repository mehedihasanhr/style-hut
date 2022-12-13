const {JWT_SECRET_ACCESS_TOKEN, JWT_SECRET_REFRESH_TOKEN} = require('../config');
const jwt = require('jsonwebtoken');


module.exports = {

    // access token
    accessToken: (payload) =>{
        return new Promise((resolve, reject) => {
            jwt.sign({
                id: payload._id,
                name: payload.first_name + ' ' + payload.last_name,
                createdAt: payload.createdAt,
                role: payload.role,
            }, JWT_SECRET_ACCESS_TOKEN, {expiresIn: '1h'}, (err, token) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            })
        })
    },

    // verify access token
    verifyAccessToken: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, JWT_SECRET_ACCESS_TOKEN, (err, decoded) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            })
        })
    },

    // refresh token
    refreshToken: (payload) => {
        return new Promise((resolve, reject) => {
            jwt.sign({
                id: payload._id,
                name: payload.first_name + ' ' + payload.last_name,
                createdAt: payload.createdAt,
            }, JWT_SECRET_REFRESH_TOKEN, {expiresIn: '7d'}, (err, token) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(token);
                }
            })
        })
    },

    // verify access token
    verifyRefreshToken: (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, JWT_SECRET_REFRESH_TOKEN, (err, decoded) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(decoded);
                }
            })
        })
    },
}