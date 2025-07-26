import { Router } from "express";
import { login, logout } from "../controllers/auth.controller.js";
import { loginValidator } from "../validators/login.validator.js";
import { handleValidationErrors } from "../middlewares/validator.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/v1/login", loginValidator, handleValidationErrors, login);
router.post("/v1/logout", protect, logout);

export default router;
