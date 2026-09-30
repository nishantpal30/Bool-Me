import { StatusCodes } from "http-status-codes";
import User from "../db/models/user.js";
import { getGoogleAuthURI, getGoogleTokens } from "../services/googleCalendar.service.js";

export const getGoogleConnectUrl = async (req , res) =>{
    if(!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET || !process.env.GOOGLE_REDIRECT_URI){
        return res 
        .status(StatusCodes.BAD_GATEWAY)
        .json({message:"Google Calendar is not config!!!"})
    };

    res.json({url:getGoogleAuthURI(req.user.id)});
};


export const handleGoogleCallback = async (req , res) =>{
    try {
        const {code ,state} = req.body;
        if(!code || !state){
            return res.redirect(`${process.env.GOOGLE_REDIRECT_URI || "https://localhost:5173"}/profile?calendar=failed`)
        }
        const token = await getGoogleTokens(code);
        if(!token.refresh_token){
            return  res.redirect(`${process.env.GOOGLE_REDIRECT_URI || "https://localhost:5173"}/profile?calendar=missing-refresh-token`)
        }

        await User.findByIdAndUpdate(state , {
            googleRefereshToken:token.refresh_token,
            googleCalenderConnected:true,
            googleCalenderId:"primary",
        });
        res.redirect(`${process.env.GOOGLE_REDIRECT_URI || "https://localhost:5173"}/profile?calendar=connected`)
    } catch (error) {
         res.redirect(`${process.env.GOOGLE_REDIRECT_URI || "https://localhost:5173"}/profile?calendar=failed`)
    }
}