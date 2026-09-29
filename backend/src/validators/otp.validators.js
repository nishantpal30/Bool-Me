import { StatusCodes } from "http-status-codes";
import { verifyOTP } from "../services/verifyOTP.js";

export const otpvalidators = async (value) => {
  const { email, purpose, emailOtp, consume } = value;
  //   console.log(email)
  // console.log(emailOtp)
  const verifyOTPresponse = await verifyOTP({
    email,
    purpose,
    emailOtp,
    consume,
  });
  if (!verifyOTPresponse.verified) {
    return {
      statusCode: StatusCodes.NOT_FOUND,
      success: verifyOTPresponse.verified,
      message: verifyOTPresponse.message,
    };
  }

  return {
    statusCode: StatusCodes.OK,
    message: verifyOTPresponse.message,
    success: verifyOTPresponse.verified,
 
  };
};
