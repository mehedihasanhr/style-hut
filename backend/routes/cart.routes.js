const router = require('express').Router();



const { CartController } = require('../controllers/cart.controller');

const cartController = new CartController();


router.post('/', cartController.create);
router.get('/:uid', cartController.find);



module.exports = router;