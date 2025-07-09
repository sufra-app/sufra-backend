import express from "express";
import cors from "cors";
import emailAuthRouter from "./src/routes/auth/email.js";
import phoneOTPRouter from "./src/routes/auth/phone.js";
import authMiddleware from "./src/middlewares/auth.js";
import errorHandler from "./src/middlewares/errorHandler.js";

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.use("/api/auth/email", emailAuthRouter);
app.use("/api/auth/phone", phoneOTPRouter);

app.use(authMiddleware);

// test route
app.get("/test", (req, res) => {
  res.send(req.user);
});

// error handler custom middleware
app.use(errorHandler);

export default app;
