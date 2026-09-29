import { StatusCodes } from "http-status-codes";
import User from "../db/models/user.js"

export const emailValidation = async (email) =>{
const userExist = await User.findOne({email});
if(userExist){
    return {
        success:false,
        statusCode:StatusCodes.BAD_REQUEST,
        message:"This email is already exist",
    }
}
else{
    return{
        success:true,
        statusCode:StatusCodes.OK,
        message:"This is valid for OTP Generation"
    }
}
}