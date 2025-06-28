import { transporter } from "./Email.confiq.js";
import dotenv from "dotenv";
dotenv.config();
export const sendVerificationCode = async (email, verificationCode) => {
  try {
    const response = await transporter.sendMail({
      from: '"Saja Nabeel" <' + process.env.EMAIL + ">",
      to: email,
      subject: "Verify Your Email!",
      text: "Verify Your Email!",
      html: verificationCode,
    });
    console.log("email send successfully", response);
  } catch (error) {
    console.log("email error");
  }
};
