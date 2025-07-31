import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const authMiddleware = async (req, res, next) => {
  try {
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
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      next(
        createHttpError.Unauthorized("Token has expired. Please log in again.")
      );
    } else if (error.name === "JsonWebTokenError") {
      next(createHttpError.Unauthorized("Invalid token."));
    } else {
      next(error);
    }
  }
};

export default authMiddleware;
