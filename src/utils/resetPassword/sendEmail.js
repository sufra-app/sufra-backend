import { transporter } from "../otp/email/Email.confiq.js";
import dotenv from "dotenv";
dotenv.config();
const sendEmail = async (email, resetURL) => {
  try {
    const mailOptions = {
      to: email,
      from: process.env.EMAIL,
      subject: "Password Reset Request",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
      Please click on the following link, or paste this into your browser to complete the process:\n\n
      ${resetURL}\n\n
      If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    const response = await transporter.sendMail(mailOptions);
    console.log("email send successfully", response);
  } catch (error) {
    console.log("email error");
  }
};

export default sendEmail;
