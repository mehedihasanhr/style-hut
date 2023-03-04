import { Router } from 'express'
import UploadController from '../controllers/UploadController'
import { upload } from '../middleware'
const router = Router()

// * all routes here...
router.post('/', upload.single('image'), UploadController.upload)

export default router
