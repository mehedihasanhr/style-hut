import tokenUtils from '../utils/TokenUtils';

const Authorize = async (req, res, next) => {
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
        return res.status(403).json({
            status: 'error',
            message: 'Unauthorized',
        });
    }
    const decodedToken = await tokenUtils.verifyAccessToken(token);       
    if (!decodedToken) {
        return res.status(403).json({
            status: 'error',
            message: 'Unauthorized',
        });
    }
    
    req.user = decodedToken;
    
    return next();
};


// is admin middleware
const isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            status: 'error',
            message: 'Unauthorized',
        });
    }
    return next();
};


export { Authorize, isAdmin };