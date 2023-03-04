import { Router } from 'express'
import heroSliderController from '../controllers/HeroSliderController'

const router = Router()

router.get('/', heroSliderController.index)
router.post('/', heroSliderController.store)
router.delete('/:id', heroSliderController.delete)

export default router
