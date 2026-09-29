import { StatusCodes } from "http-status-codes";
import { filldetailsVerification } from "../validators/filldetails.validators.js";
import User from "../db/models/user.js";
import { otpvalidators } from "../validators/otp.validators.js";
import slugify from "../utils/slug.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerService = async (data) => {

 const {name , email , password , businessName,businessDescription , timezone ,emailotp} =data ;
       const filldetailsVerify = filldetailsVerification(data);
       if(!filldetailsVerify.success){
          return{
            message: filldetailsVerification.message,
            status:filldetailsVerification.status,
            statusCode :filldetailsVerification.statusCode
        }
       };

       const userEmail = email.toLowerCase().trim();
       const value ={
        userEmail,
        purpose : "registration" ,
        emailotp,
        consume : true,
       }

       const OTPverification = otpvalidators(value);
       if(!OTPverification.success){
        return{
            message:OTPverification.message,
            statusCode:OTPverification.statusCode,
            success:OTPverification.success,
        }
       }
       const slug = slugify(User.businessName || User.name)||"business";
       let finalslug = slug;
       let counter =1;
       while(await User.findOne({slug:finalslug})){
        finalslug =`${slug}-${counter}`
        counter +=1;
       }
   
const hashPassword = await bcrypt.hash(password,10);
const user = await User.create({
    name,
    email:userEmail,
    password:hashPassword,
    slug:finalslug,
    businessName:businessName ||" ",
    timezone: timezone||"Asia/Kolkata",
});
const createToken = await jwt.sign(user._id , process.env.JWT_SECRET_KEY,{ expiresIn: "1d",});
return{
    statusCode:StatusCodes.CREATED,
    message:"User is created successfully!",
    createToken,
    
}

}