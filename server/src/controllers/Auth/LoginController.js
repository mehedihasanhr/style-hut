import config from '../../config';
import User from '../../models/UserModel';
import { UserResponse } from '../../response/UserResponse';
import tokenUtils from '../../utils/TokenUtils'

class LoginController {
    login = async (req, res) => {
        const { email, password } = req.body;
        try{
            // * check if user provided current credentials
            // ! if not, return error
            if(!email || !password) {
                return res.status(400).json('Please provide email and password');
            }

            // * check if user exists
            const existedUser = await User.findOne({ email }).exec();
            
            // ! if user is not existed, return error
            if(!existedUser) {
                return res.status(400).json('Your credentials are not correct')
            }


            // * check if password is correct
            const isPasswordCorrect = await existedUser.validatePassword(password);

            // ! if password is not correct, return error
            if(!isPasswordCorrect) {
                return res.status(400).json('Your credentials are not correct')
            }
            
            // * user response
            UserResponse(req, res, {
                user: existedUser,
                message: 'User logged in successfully'
            });
        }catch(err){
            console.log(err);
            return res.status(500).json('Internal server error');
        }
    }
}


export default new LoginController();