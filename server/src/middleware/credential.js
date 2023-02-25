import config from '../config';

export const credentials = (req, res, next) => {
    const listedOrigins = config.origin.split(',');
    const origin = req.headers.origin;

    if (listedOrigins.indexOf(origin) !== -1) {
        res.setHeader('Access-Control-Allow-Origin', "*");
        res.setHeader('Access-Control-Allow-Credentials', true);
    }
    next();
}