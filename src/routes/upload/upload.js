import express from "express";
import multer from "multer";
import cloudinary from "../../utils/cloudinary/cloudinary.config.js";
import createHttpError from "http-errors";
import fs from "fs";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/image", upload.single("image"), async (req, res) => {
  console.log("File:", req.file);
  if (!req.file) {
    throw createHttpError.BadRequest({ error: "No file uploaded" });
  }
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (!allowedTypes.includes(req.file.mimetype)) {
    fs.unlinkSync(req.file.path);
    throw createHttpError.BadRequest({ error: "Invalid file type" });
  }

  const result = await cloudinary.uploader.upload(req.file.path, {
    folder: "Sufra",
  });
  if (!result || !result.secure_url) {
    fs.unlinkSync(req.file.path);
    throw createHttpError.InternalServerError("Failed to upload image");
  }

  console.log("Cl oudinary Result:  ", result);

  fs.unlinkSync(req.file.path);
  return res.json({ url: result.secure_url });
});

export default router;
