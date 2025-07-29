import twilio from "twilio";
import createHttpError from "http-errors";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendOTP = async (phoneNumber) => {
  try {
    const response = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verifications.create({
        to: phoneNumber,
        channel: "sms",
      });

    return response;
  } catch (error) {
    console.error("Twilio Error:", error.message);

    if (error.code === 21608) {
      throw createHttpError.BadRequest(
        "This phone number is not verified for your Twilio trial account."
      );
    }
    throw createHttpError.BadRequest("Failed to send OTP: " + error.message);
  }
};

export default sendOTP;
