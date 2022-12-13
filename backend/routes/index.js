const router = require("express").Router();


//  routes 
const ProductsRoutes = require('./products.routes');
const UsersRoutes = require('./users.routes');
const AuthRoutes = require('./auth.routes');
const CommentsRoutes = require('./comment.routes');
const CartRoutes = require('./cart.routes');


// all routes
router.use('/products', ProductsRoutes);
router.use('/users', UsersRoutes);
router.use('/auth', AuthRoutes);
router.use('/comments', CommentsRoutes);
router.use('/carts', CartRoutes);


module.exports = router;

