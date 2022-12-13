const {UserController} = require('../controllers/users.controller');
const router = require('express').Router();
const UploadImage = require('../middlewares/uploadImage');
const { authorize } = require('../middlewares/authorize');
const { checkIsAdmin } = require('../middlewares/checkIsAdmin');

const users = new UserController();

router.use(authorize);
router.get('/', checkIsAdmin, users.index);
router.get('/:id', users.show);
router.put('/:id', users.update);
router.delete('/:id', users.delete);
router.post('/:id/upload', UploadImage.single('avatar'), users.upload);


module.exports = router;