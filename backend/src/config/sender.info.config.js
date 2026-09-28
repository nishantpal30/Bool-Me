import dotenv  from "dotenv";
import ParseEmail from "../utils/parseEmail.js"
import RzpEmailAddress from "../utils/rzpemail.js";
dotenv.config();





const getSender = () => {
  const from = process.env.EMAIL_FROM || '';
  const email = process.env.BREVO_SENDER_EMAIL || ParseEmail(from) || '';
  const name = process.env.BREVO_SENDER_NAME || RzpEmailAddress(from) || 'BookMe';

  return { email, name };
};


export default getSender;
