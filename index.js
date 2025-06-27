import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRouter from "./src/routes/auth.js";
import authMiddleware from "./src/middlewares/auth.js";
const app = express();
// middlewares
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);


// port
const PORT = process.env.PORT || 3000;
// TEST ROUTE
app.get("/test", authMiddleware, (req, res) => {
  res.send(req.user);
});
// connect to database
await connectDB();
// listen to port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
