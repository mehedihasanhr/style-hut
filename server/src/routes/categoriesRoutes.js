import { Router } from 'express'
import categoriesController from '../controllers/CategoriesController'

const router = Router()

router.get('/', categoriesController.index)
router.post('/', categoriesController.store)

export default router
