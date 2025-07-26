import { body } from "express-validator";
export const createProductValidator = [
  body("code").isString().notEmpty(),
  body("name").isString().notEmpty(),
  body("price").isFloat().notEmpty(),
  body("stock").isInt().notEmpty(),
];
