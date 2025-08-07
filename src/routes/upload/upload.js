import express from "express";
import multer from "multer";
import cloudinary from "../../utils/cloudinary/cloudinary.config.js";
import createHttpError from "http-errors";
import fs from "fs";

const router = express.Router();

const upload = multer({
  dest: "/tmp/",
  limits: { fileSize: 5 * 1024 * 1024 }, 
});

router.post("/image", upload.single("image"), async (req, res) => {
    console.log("Received file:", req.file);

    if (!req.file) {
      throw createHttpError.BadRequest("No file uploaded");
    }

    const fileExists = fs.existsSync(req.file.path);
    console.log("Temp file exists?", fileExists);

    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
    if (!allowedTypes.includes(req.file.mimetype)) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (err) {
        console.error("Failed to delete invalid file:", err.message);
      }
      throw createHttpError.BadRequest("Invalid file type");
    }

    console.log("Uploading to Cloudinary:", req.file.path);

    let result;
    try {
      result = await cloudinary.uploader.upload(req.file.path, {
        folder: "Sufra",
      });
    } catch (uploadErr) {
      console.error("Cloudinary upload error:", uploadErr);
      fs.unlinkSync(req.file.path);
      throw createHttpError.InternalServerError("Failed to upload to Cloudinary");
    }

    if (!result || !result.secure_url) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (err) {
        console.error("Failed to delete file after failed upload:", err.message);
      }
      throw createHttpError.InternalServerError("Upload returned no URL");
    }

    try {
      fs.unlinkSync(req.file.path);
    } catch (err) {
      console.error("Failed to delete temp file:", err.message);
    }

    console.log("Upload successful:", result.secure_url);
    return res.status(200).json({ url: result.secure_url });

});

export default router;
