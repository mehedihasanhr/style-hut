import rateLimit from 'express-rate-limit';

// * 100 requests per 15 minutes
export const apiLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // * 15 minutes
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again in 15 minutes',
});
