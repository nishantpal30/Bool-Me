import ParseEmail from "./parseEmail";


const RzpEmailAddress = (rzpEmail = '') => {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(ParseEmail(rzpEmail), '')
    .replace(/["']/g, '')
    .trim();
};

export default RzpEmailAddress;    