import ParseEmail from "./parseEmail.js";

const getReplyToEmail = (replyTo) => {
  const email = ParseEmail(replyTo?.email || "");
  if (!email) return null;

  return {
    email,
    name: replyTo.name || email,
  };
};

export default getReplyToEmail;
