import rateLimit from 'express-rate-limit';
import  MongoStore from 'rate-limit-mongo';
import config from '../config';


// * 7 login attempts per 15 minutes from same email address locked for 1 hour

export const loginAttemptsLimiter = rateLimit({
    windowMs: 1000 * 60 * 60, // * 1 hour
    max: 10,
    store: new MongoStore({
        uri: config.db.uri,
        collectionName: 'loginAttempts',
        expireTimeMs: 1000 * 60 * 60, // * 1 hour
        errorHandler: (err) => {
            console.log(err);
        }
    }),
    message: 'Your account is locked for 1 hour due to too many login attempts',
    keyGenerator: (req) => { 
        return req.body.email;
    }
});
