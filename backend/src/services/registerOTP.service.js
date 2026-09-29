import { StatusCodes } from "http-status-codes";
import { emailValidation } from "../validators/email.validator.js";
import { emailOTP } from "./emailOTP.js";


export const registerOTP_Service = async (email) =>{
   
    const {userEmail} = email;
     
 const registerEmail_Validation = await emailValidation(userEmail);

 if(registerEmail_Validation.success){
    const OTP_Request = await emailOTP({email:userEmail,purpose:"registration"})
    return{
        statusCode:StatusCodes.OK,
        success:OTP_Request.success,
        email:OTP_Request.email,
        message:"OTP generated successfully"
    }
 }
 else{
    return{
        statusCode:StatusCodes.BAD_REQUEST,
        success:false,
        message:"OTP not generated"
    }
 }
}
       