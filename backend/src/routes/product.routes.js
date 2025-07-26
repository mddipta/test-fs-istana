import { Router } from "express";
import { createProductValidator } from "../validators/create-product.validator.js";
import { handleValidationErrors } from "../middlewares/validator.middleware.js";
import { protect } from "../middlewares/auth.middleware.js";
import { create } from "../controllers/product.controller.js";
import { getAll } from "../controllers/product.controller.js";

const router = Router();

router.get("/v1/products", protect, getAll);
router.post(
  "/v1/products",
  protect,
  createProductValidator,
  handleValidationErrors,
  create
);

export default router;
