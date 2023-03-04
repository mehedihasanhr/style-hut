import { Router } from 'express'
import authRoute from './authRoutes'
import productRoute from './productsRoutes'
import cartRoutes from './cartsRoutes'
import ordersRoutes from './ordersRoutes'
import uploadsRoutes from './uploadsRoutes'
import categoriesRoutes from './categoriesRoutes'

const router = Router()

// * all routes here...
router.use('/auth', authRoute)
router.use('/products', productRoute)
router.use('/carts', cartRoutes)
router.use('/orders', ordersRoutes)
router.use('/uploads', uploadsRoutes)
router.use('/categories', categoriesRoutes)

export default router
