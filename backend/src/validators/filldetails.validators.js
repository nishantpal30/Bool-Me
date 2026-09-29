import { StatusCodes } from "http-status-codes";
import User from "../db/models/user.js";

export const filldetailsVerification = async (data) =>{
     const {name , email , password , businessName,businessDescription , timezone ,emailotp} = data
    if( !name || !email || !password) {
        return{
            statusCode:StatusCodes.NOT_FOUND,
            message:"Name , Email and Password is required",
            status:false,
        }
    }
    const emailcheck = await User.findOne({email});
if(emailcheck)
    {
    return{
        message :"User email already exist",
        success : false,
        statusCode : StatusCodes.TOO_MANY_REQUESTS
    }
};

return{
    message:"All details okk",
    success:true,
    statusCode:StatusCodes.OK
  };
}