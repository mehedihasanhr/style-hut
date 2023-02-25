import User from "../../models/UserModel";
import { UserResponse } from "../../response/UserResponse";
import tokenUtils from "../../utils/TokenUtils";
import config from "../../config";

class RefreshController {
   refresh = async (req, res) => {
       const uid = req.session.user.data.id;

     if(!uid) {
        return res.status(401).json({
           status: 'error',
           message: 'Unauthorized'
        })
     }



    try{
        const user = await User.findById(uid).select('-password').exec();

        // ! if user is not existed, return error
        if(!user) {
            return res.status(400).json({
                status: 'error',
                message: 'User not found'
            })
        }

        // * user response
        UserResponse(req, res, {
            user,
            message: 'User refreshed successfully'
        });

    }catch(err){
        console.log('error')
        return res.status(500).json({
            status: 'error',
            message: err?.message || 'Internal server error' 
        })
    }

   }
}


export default new RefreshController();