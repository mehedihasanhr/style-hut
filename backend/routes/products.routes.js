const router = require("express").Router();
const ProductController = require('../controllers/products.controller');
const uploadImage = require('../middlewares/uploadImage');
const { authorize } = require('../middlewares/authorize');




// returen images url
const getImagesUrl = (req, res) => {
    const files = req.files;

    if (!files) {
        const error = new Error('Please choose files');
        error.httpStatusCode = 400;
        return next(error);
    }

    let images = [];

    files.map(file => {
        images.push(file.filename);
    })

    res.send(images);
}


// if user is admin, he can access all routes
const accessPermission = (req, res, next) => {
    if (req.user.role === 'admin' || req.user.role === 'seller') {
        next();
    } else {
        return res.status(401).json({
            message: 'you are not authorized to access this action',
            error: true
        });
    }
}



router.get('/', ProductController.getAll);
router.get('/:id', ProductController.getOne);

router.use(authorize, accessPermission);
router.post('/',  ProductController.createOne);
router.put('/:id', ProductController.updateOne);
router.delete('/:id', ProductController.deleteOne);
router.post('/uploads', uploadImage.array('images', 10), getImagesUrl);



module.exports = router;