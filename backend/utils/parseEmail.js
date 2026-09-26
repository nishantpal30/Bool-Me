const parseEmail = (email = " ") => {
      const match = value.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  return match?.[0] || '';

};
 export default parseEmail;