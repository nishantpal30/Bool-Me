const ParseEmail = (email = "") => {

    const match = email.match(
        /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i
    );

    return match?.[0] || "";
};

export default ParseEmail;