import User from '../../models/UserModel';

class AuthController {
    async me(req, res) {
       const user = await User.findById(req.user.id).select('-password -__v');

        if(!user) {
            return res.status(404).json('User not found');
        }

        return res.status(200).json({
            success: true,
            data: user
        });
    }
}

export default new AuthController();