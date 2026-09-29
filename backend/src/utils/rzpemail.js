import ParseEmail from "./parseEmail.js";


const RzpEmailAddress = (rzpEmail = '') => {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(ParseEmail(rzpEmail), '')
    .replace(/["']/g, '')
    .trim();
};

export default RzpEmailAddress;    