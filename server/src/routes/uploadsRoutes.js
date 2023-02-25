import { Router } from "express";
import UploadController from "../controllers/UploadController";
import { isFileAlreadyExist, upload } from "../middleware";
const router = Router();

// * all routes here...
router.post("/",upload.single('image'),isFileAlreadyExist, UploadController.upload);

export default router;