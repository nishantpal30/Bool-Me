import { registerOTP_Service } from "../services/registerOTP.service.js";
import { StatusCodes } from "http-status-codes";
import { registerService } from "../services/register.service.js";
import User from "../db/models/user.js";
import { verifyOTP } from "../services/verifyOTP.js";
import { userLogin_Service } from "../services/userlogin.service.js";

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
    const registerOTP_Response = await registerOTP_Service({userEmail:OTPemail});
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

export const verifyRegistration_OTP = async (req , res) => {
try {
    const {email , emailOTP} = req.body;
    const userEmail = email?.toLowerCase().trim()
    if(!userEmail || !emailOTP){
        return res 
        .status(StatusCodes.BAD_REQUEST)
        .json({success:false,message:"Email and Otp is Required"})
    };

    const userExist = await User.findOne({email:userEmail});
    if(userExist){
        return res 
        .status(StatusCodes.BAD_REQUEST)
        .json({message:"Email is already Exist"})
    }
const verifyOTP_Result = await verifyOTP({
    email:userEmail,
    purpose:"registration",
    otp_Code:emailOTP,
    consume:false,
});

if(!verifyOTP_Result.verified){
    return res 
    .status(StatusCodes.BAD_REQUEST)
    .json({
        success:false,
        message:verifyOTP_Result.message
    })
}

return res 
.status(StatusCodes.OK)
.json(verifyOTP_Result)




} catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
      success: false,
    });
}
};

export const loginUser = async (req , res) =>{
try {
  
    const loginUser_Response = await userLogin_Service(req.body);
    if(loginUser_Response.success==true){
        return res 
        .status(loginUser_Response.statusCode)
         .cookie("token", loginUser_Response.createToken, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })
         .json({
            success:loginUser_Response.success,
            message:loginUser_Response.message,
            user:loginUser_Response.checkUser,
         })
    }
} catch (error) {
     return res.status(StatusCodes.BAD_REQUEST).json({
      message: error.message,
      success: false,
    });
}
}

export const updateProfile = async (req, res) => {
  try {
    const { businessName, businessDiscription, timezone, brandTheme, brandAccent } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (businessName !== undefined) user.businessName = businessName;
    if (businessDiscription !== undefined) user.businessDiscription = businessDiscription;
    if (timezone !== undefined) user.timezone = timezone;
    if (brandTheme !== undefined) user.brandTheme = brandTheme;
    if (brandAccent !== undefined) user.brandAccent = brandAccent;

    const baseSlug = slugify(user.businessName || user.name) || 'business';
    let finalSlug = baseSlug;
    let counter = 1;

    while (await User.findOne({ slug: finalSlug, _id: { $ne: user._id } })) {
      finalSlug = `${baseSlug}-${counter}`;
      counter += 1;
    }

    user.slug = finalSlug;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: toUserResponse(user),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getMe = async (req, res) =>{
    try {
        const user = await User.findById(req.use.id).select("password");
        if(!user){
            return res.status(404)
            .json({
                message:"user not found",
            });
        };
        res.json({user:toUserResponse(user)});
    } catch (error) {
          res.status(500).json({ message: 'Server error', error: error.message })
    };
  }

