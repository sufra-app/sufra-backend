import express from "express";
import multer from "multer";
import cloudinary from "../../utils/cloudinary/cloudinary.config.js";
import createHttpError from "http-errors";
import fs from "fs";

const router = express.Router();

const upload = multer({ dest: "/tmp/" });

router.post("/image", upload.single("image"), async (req, res, next) => {
    if (!req.file) {
      throw createHttpError.BadRequest("No file uploaded");
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (err) {
        console.error("Failed to delete invalid file:", err.message);
      }
      throw createHttpError.BadRequest("Invalid file type");
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "Sufra",
    });

    if (!result || !result.secure_url) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (err) {
        console.error("Failed to delete file after failed upload:", err.message);
      }
      throw createHttpError.InternalServerError("Failed to upload image");
    }
    try {
      fs.unlinkSync(req.file.path);
    } catch (err) {
      console.error("Failed to delete temp file:", err.message);
    }

    return res.status(200).json({ url: result.secure_url });
});

export default router;
