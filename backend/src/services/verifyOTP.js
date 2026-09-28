import EmailOtp from "../db/models/emailOtp";
import { normalizedEmail } from "../utils/normalizedEMail.js";
import bcrypt from "bcryptjs";

const MAX_ATTEMPTS = 5;
export const verifyOTP = async ({
  email,
  purpose,
  otp_Code,
  consume = false,
}) => {
  const normalEmail = normalizedEmail(email);
  if (!normalEmail || !otp_Code) {
    return { verified: false, message: "Email and OTP are required" };
  }
  const userDetails = await EmailOtp.findOne({
    email: normalEmail,
    purpose,
    consumeAt: null,
    expireAt: { $gt: new Date() },
  }).sort({ createdAt: -1 });
  // this sort function sort the opt in newest to oldest (descending order)

  if (!userDetails) {
    return { verified: false, message: "OTP experied or not found" };
  }

//   await EmailOtp.updateOne({ _id: userDetails._id }, { $inc: { attempts: 1 } });
  if (userDetails.attempts >= MAX_ATTEMPTS) {
    return { verified: false, message: "Too many OTP attempts" };
  }
  const isMatch = await bcrypt.compare(
    String(otp_Code).trim(),
    userDetails.codeHash,
  );
  if(!isMatch){
    userDetails.attempts +=1;
    await userDetails.save();
    return{
        verified:false,
        message:"Invalid OTP",
    }
  }

  if(consume){
    userDetails.consumeAt = new Date();
    await userDetails.save();
  }
  return{
    verified:true,
    email:normalEmail,
    message:"OTP verification success"
  }
}
