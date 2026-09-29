import { StatusCodes } from "http-status-codes";
import { verifyOTP } from "../services/verifyOTP.js";

export const otpvalidators = (value) => {
  const { userEmail, purpose, emailotp, consume } = value;
  const verifyOTPresponse = verifyOTP({
    userEmail,
    purpose,
    emailotp,
    consume,
  });
  if(!verifyOTPresponse.verified){
    return{
        statusCode:StatusCodes.NOT_FOUND,
        success : verifyOTPresponse.verified,
        message:verifyOTPresponse.message,
    }
  }

  return{
    statusCode:StatusCodes.OK,
    message:verifyOTPresponse.message,
    success:verifyOTPresponse.verified,
  }
};
