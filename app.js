import express from "express";
import cors from "cors";
import emailAuthRouter from "./src/routes/auth/email.js";
import phoneOTPRouter from "./src/routes/auth/phone.js";
import authMiddleware from "./src/middlewares/auth.js";
import errorHandler from "./src/middlewares/errorHandler.js";
import notFound from "./src/middlewares/notFound.js";
import vendorProfileRouter from "./src/routes/provider/profile.js";
import dishRouter from "./src/routes/provider/dish.js";
import uploadRouter from "./src/routes/upload/upload.js";

const app = express();

app.use("/api/upload", uploadRouter);
// middlewares
app.use(cors());
app.use(express.json());

app.use("/api/auth/email", emailAuthRouter);
app.use("/api/auth/phone", phoneOTPRouter);
app.use("/api/vendor/profile", vendorProfileRouter);
app.use("/api/vendor/dish", dishRouter);

// test route
app.get("/test", authMiddleware, (req, res) => {
  res.send(req.user);
});

// error handler custom middleware
app.use(notFound);

app.use(errorHandler);

export default app;
