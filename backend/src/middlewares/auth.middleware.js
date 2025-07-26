import jwt from "jsonwebtoken";
import { formatResponse } from "../utils/response.js";

export const protect = (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;

      next();
    } catch (error) {
      console.error("Token verification error:", error);
      return res
        .status(401)
        .json(formatResponse(null, "Token is not valid", 401));
    }
  }

  if (!token) {
    return res
      .status(401)
      .json(formatResponse(null, "Token is not valid or expired", 401));
  }
};
