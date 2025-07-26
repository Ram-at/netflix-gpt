export const checkValidInfo = (email, password) => {
  const isValidEmail = /^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
  const isValidPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);

  if (!email || !isValidEmail) {
    return "Email is invalid";
  }

  if (!password || !isValidPassword) {
    return "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character";
  }

  return null; // everything is valid
};
