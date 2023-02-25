import User from "../../models/UserModel";
import { UserResponse } from "../../response/UserResponse";

class RegisterController {
    register = async (req, res) => {
        const { name, email, password } = req.body;

        // * check if user provided current credentials
        // ! if not, return error
        if(!name || !email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Please fill all fields'
            })
        }

        try{
            // * check if user exists
            const isExisted = await User.findOne({ email }).exec();

            // ! if user is existed, return error
            if(isExisted) {
                return res.status(400).json({
                    status: 'error',
                    message: 'User already exists'
                })
            }

            // * create user
            const user = await User.create({...req.body});

            // * check if user is created
            // ! if not, return error

            if(!user) {
                return res.status(400).json({
                    status: 'error',
                    message: 'Something went wrong'
                })
            } 
            
            // * user response
            UserResponse(req, res, {
                user,
                message: 'User created successfully'
            });

            // // * generate token
            // const tokenPayload = {
            //     id: user._id,
            //     email: user.email,
            //     role: user.role,
            //     name: user.name,
            // }

            // const accessToken = await tokenUtils.accessToken(tokenPayload);
            // const refreshToken = await tokenUtils.refreshToken(tokenPayload);
            
            // // * check if token is generated
            // // ! if not, return error
            // if(!accessToken || !refreshToken) {
            //     return res.status(500).json({
            //         status: 'error',
            //         message: 'Internal server error', 
            //     });
            // }

            // // * active session
            // req.session.user = {
            //     user: {
            //         data : tokenPayload,
            //         logs: {
            //             ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
            //             agent: req.headers['user-agent'],
            //             loginAt: new Date(),
            //         }
            //     }
            // }

            // // * set token to cookie
            // res.cookie('_rt', refreshToken, {
            //     httpOnly: true,
            //     maxAge: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // * 7 days
            //     secure: config.env === 'production' ? true : false,
            //     sameSite: 'none'
            // });

            
            // // * return token
            
            // return res.status(200).json({
            //     status: 'success',
            //     message: 'User created successfully',
            //     data: {
            //         token: accessToken,
            //         user: {
            //             id: user._id,
            //             name: user.name,
            //             email: user.email,
            //             role: user.role,
            //         }
            //     }
            // });

        }catch(err){
            console.log(err);
            res.status(500).json({
                status: 'error',
                message: 'Internal server error'
            })
        }
    }
}



export default new RegisterController();