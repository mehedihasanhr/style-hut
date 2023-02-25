import { Router } from "express";
import LoginController from "../controllers/Auth/LoginController";
import RefreshController from "../controllers/Auth/RefreshController";
import RegisterController from "../controllers/Auth/RegisterController";
import { sessionValidation } from "../middleware";
import { loginAttemptsLimiter } from "../middleware/LoginAttemptsLimiter";
import AuthController from "../controllers/Auth/AuthController";
import logoutController from "../controllers/Auth/LogoutController";
import { Authorize } from "../middleware/Authorize";

const router = Router();

router.post("/login",loginAttemptsLimiter, LoginController.login);
router.post("/register", RegisterController.register);

// * protected routes
router.use(sessionValidation);
router.get("/refresh", RefreshController.refresh);
router.get("/me", Authorize, AuthController.me);
router.get("/logout", logoutController.logout);
  

export default router;

