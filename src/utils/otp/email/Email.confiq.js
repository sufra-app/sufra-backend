import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ ADD THIS HERE
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP verify failed:", error);
  } else {
    console.log("SMTP ready");
  }
});
