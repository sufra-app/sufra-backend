import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    throw createHttpError.Unauthorized("Access denied. No token provided.");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded._id);

  if (!user) {
    throw createHttpError.Unauthorized("User not found.");
  }

  req.user = user; 
  next();
};

export default authMiddleware;
