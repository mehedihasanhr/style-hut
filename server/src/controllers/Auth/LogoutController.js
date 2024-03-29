
class LogoutController {
    async logout(req, res){
        try {
            req.session.destroy();
            res.clearCookie('connect.sid');
            res.status(200).json({ message: 'Logout successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Logout failed' });
        }
    }
}

export default new LogoutController();