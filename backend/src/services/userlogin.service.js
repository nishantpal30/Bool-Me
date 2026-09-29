import bcrypt from "bcryptjs";
import User from "../db/models/user";
import { loginInpu_Validater } from "../validators/filldetails.validators";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export const userLogin_Service = async (data) => {
  const { email, password } = data;
  const userLogin_Input = loginInpu_Validater(data);
  if (userLogin_Input.success === false) {
    return {
      statusCode: userLogin_Input.statusCode,
      success: userLogin_Input.success,
      message: userLogin_Input.message,
    };
  } else {
    const userEmail = email.toLowerCase().trim();
    const checkUser = await User.findOne({ email: userEmail });
    if (!checkUser) {
      return {
        userLogin_Input,
        message: "User does not exist with this email",
      };
    }
    const matchPassword = await bcrypt.compare(password, checkUser.password);
    if (!matchPassword) {
      return {
        userLogin_Input,
        message: "Worng Passward",
        statusCode: StatusCodes.BAD_REQUEST,
      };
    }
    const user = {userId:checkUser._id}
    const createToken = jwt.sign(
      { userId: user },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" },
    );
    return {
        userLogin_Input,
        success:true,
        createToken,
        checkUser,
        message:"User Login success"
    }
  }
};
