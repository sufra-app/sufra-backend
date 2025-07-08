import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRouter from "./src/routes/auth.js";
import phoneOTPRouter from "./src/routes/phoneOTP.js";
import authMiddleware from "./src/middlewares/auth.js";
import errorHandler from "./src/middlewares/errorHandler.js";
const app = express();
// middlewares
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/phoneOTP", phoneOTPRouter);
app.use(authMiddleware);

// port
const PORT = process.env.PORT || 3000;
// TEST ROUTE
app.get("/test", (req, res) => {
  res.send(req.user);
});

// error handler custome middleware
app.use(errorHandler);
// connect to database
await connectDB();
// listen to port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
