import parseEmail from "./parseEmail";


const rzpEmailAddress = (rzpEmail = '') => {
  return value
    .replace(/<[^>]+>/g, '')
    .replace(parseEmail(rzpEmail), '')
    .replace(/["']/g, '')
    .trim();
};

export default rzpEmailAddress;    