import getSender from "../config/sender.info.config.js";


const getPlatformSender = (senderName) => {
  const sender = getSender();

  return {
    email: sender.email,
    name: senderName || sender.name,
  };
};


export default getPlatformSender;