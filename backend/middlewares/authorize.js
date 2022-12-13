const {verifyAccessToken} = require('../utils/token')
const {User} = require('../models/user.model')

module.exports = {
    authorize: async(req, res, next) => {
       
        const authorization = req.headers['authorization'];

        // check  authorization header is not empty send error
        if(!authorization){
            return res.status(401).json({
                message: 'Unauthorized',
                error: true
            });
        }

        // get token from authorization header
        const token = authorization.split(' ')[1];

        // verify token

        const decord = await verifyAccessToken(token);

        // if token is not valid send error
        if(!decord){
            return res.status(401).json({
                message: 'Unauthorized',
                error: true
            });
        }
        
    

        // if token is valid, set user id to request object
        const user = await User.findById(decord.id).select(["-password", "-__v"]).exec();

        if(user){
            req.user = user;
            next();
        }else{
            return res.status(401).json({
                message: 'Unauthorized',
                error: true
            });
        }
    }
}