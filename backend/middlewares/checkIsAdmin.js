
const checkIsAdmin = (req, res, next) => {
    if(req.user.role === 'admin'){
        next();
    }else{
        return res.status(401).json({
            message: 'you are not authorized to access this action',
            error: true
        });
    }
}


module.exports = {checkIsAdmin};