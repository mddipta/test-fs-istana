import { validationResult } from "express-validator";
import { formatResponse } from "../utils/response.js";

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorResponses = errors.array().map((error) => ({
      field: error.path,
      message: error.msg,
    }));
    const response = formatResponse(null, errorResponses, 400);
    return res.status(400).json(response);
  }
  next();
};
