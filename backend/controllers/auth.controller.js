const { User } = require('../models/user.model');
const {accessToken, refreshToken} = require('../utils/token');

// POST /auth/login

class AuthController {

    // register user and generate token
    async register(req, res) {
        const data = req.body;

        // check all fields are filled
        if(!data.first_name || !data.last_name || !data.email || !data.password) {
            return res.status(400).json({
                message: 'Empty fields are not allowed',
                error: true
            })
        }

        const user = await User.create(data); // create user in database

        // if user created failed
        if(!user) {
            return res.status(400).json({
                message: 'Error creating user',
                error: true
            })
        }

        // generate token
        const token = await accessToken(user);
        const r_token = await refreshToken(user);


        /// set http only cookie for refresh token
        res.cookie('__rt', r_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            expires: new Date(Date.now() + 7 * 60 * 60 * 1000) // 30 days
        })

        

        // if user created successfully
        // create user object to send to client

        const userInfo = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            phone: user.phone,
            address: user.address,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }

        // send token and user info to client
        return res.status(200).json({
            message: 'User created successfully',
            error: false,
            data: {
                token,
                user: userInfo
            }
        })


    }


    // login user and generate token
    async login(req, res) {
        const { email, password } = req.body;

        // check all fields are filled
        if(!email || !password){
            return res.status(400).json({
                message: 'Invalid credentials',
                error: false
            });
        }

        const user = await User.findOne({ email }); // find user in database

        // if user not found
        if(!user) {
            return res.status(400).json({
                message: 'Invalid credentials',
                error: false
            })
        }

        // if user found, check password
        const isMatch = await user.isValidPassword(password);

        if(!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials',
                error: false
            })
        }

         // generate token
         const token = await accessToken(user);
         const r_token = await refreshToken(user);
 
 
         /// set http only cookie for refresh token
 
         res.cookie('__rt', r_token, {
             httpOnly: true,
             secure: true,
             sameSite: 'none',
             expires: new Date(Date.now() + 7 * 60 * 60 * 1000) // 30 days
         })
 

        // if password match, create user object to send to client
        const userInfo = {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role,
            avatar: user.avatar,
            phone: user.phone,
            address: user.address,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }



        // if password is correct, generate token and send to client
        return res.status(200).json({
            message: 'Login successful',
            error: false,
            data: {
                token,
                user: userInfo
            }
        });
        
    }
}


module.exports = {AuthController};