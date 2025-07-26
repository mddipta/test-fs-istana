import { UserModel } from "../models/user.model.js";
import { formatResponse } from "../utils/response.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findByUsername(username);

    if (!user) {
      return res
        .status(401)
        .json(formatResponse(null, "Invalid username or password", 401));
    }

    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return res
        .status(401)
        .json(formatResponse(null, "Invalid username or password", 401));
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json(formatResponse({ token }, "Success", 200));
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(401)
      .json(formatResponse(null, "Invalid username or password", 401));
  }
}

export async function logout(req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json(formatResponse(null, "Success", 200));
  } catch (error) {
    return res.status(401).json(formatResponse(null, "Invalid token", 401));
  }
}
