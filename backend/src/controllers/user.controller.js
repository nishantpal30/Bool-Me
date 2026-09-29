import { registerOTP_Service } from "../services/registerOTP.service.js";
import { StatusCodes } from "http-status-codes";
import { registerService } from "../services/register.service.js";

export const registerUser = async (req, res) => {
  try {
    const registerResponse = await registerService(req.body);
    return res.status(registerResponse.statusCode).json(registerResponse);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
      success: false,
    });
  }
};

export const registerOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const OTPemail = email?.toLowerCase().trim();
    if (!OTPemail) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ success: false, message: "Email is required" });
    }
    const registerOTP_Response = await registerOTP_Service(OTPemail);
    return res
      .status(registerOTP_Response.statusCode)
      .json(registerOTP_Response);
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
      success: false,
    });
  }
};
