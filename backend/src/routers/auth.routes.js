import express from "express";
import isAuthenticated from "../middlewares/isauth.middleware.js";
import { getMe, loginUser, registerOTP, registerUser, updateProfile, verifyRegistration_OTP } from "../controllers/user.controller.js";

const authrouter = express.Router();

authrouter.post("/regiister",registerUser);
authrouter.post("/register/request-otp",registerOTP);
authrouter.post("/regiister/verify-otp",verifyRegistration_OTP);
authrouter.post("/login",loginUser);
authrouter.post("/me",isAuthenticated,getMe);
authrouter.post("/profile",isAuthenticated,updateProfile);

export default authrouter;