const router = require("express").Router();
const {AuthController} = require('../controllers/auth.controller');

const auth = new AuthController();

router.post('/login', auth.login);
router.post('/register', auth.register);


module.exports = router;