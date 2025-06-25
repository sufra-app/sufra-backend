import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  console.log("Token received:", token);

  if (!token) {
    return res
      .status(401)
      .send({ message: "Access denied. No token provided." });
  }
  try {
    console.log("Verifying JWT...");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send({ message: "Invalid or expired token." });
  }
};

export default authMiddleware;
