const router = require('express').Router();

const { OrderController } = require('../controllers/order.controller');
const { authorize } = require('../middlewares/authorize.middleware');
const { checkIsAdmin } = require('../middlewares/checkIsAdmin.middleware');


const orderController = new OrderController();



router.use(authorize);
router.get('/', checkIsAdmin, orderController.index);
router.post('/', orderController.create);
router.get('/:uid', orderController.find);
router.get('/:id', orderController.findById);

module.exports = router;