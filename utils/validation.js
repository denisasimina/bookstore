export const validateEmail = (email) => {
    const regexStr = 
    /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
    return regexStr.test(email);
};
