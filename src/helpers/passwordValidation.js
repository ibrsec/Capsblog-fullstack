export const passwordValidation = (password, setPassError) => {
  console.log(password, "password");
  //   //length
  //   if (!/[A-Z]/.test(password)) {
  //     //upper
  //     return "At least 1 uppercase char!!";
  //   } else if (!/a-z/.test(password)) {
  //     //lower
  //     return "At least 1 lowercase char!!";
  //   } else if (!/[0-9]/.test(password)) {
  //     //number
  //     return "At least 1 number!!";
  //   } else if (!/[@$!%*?&]/.test(password)) {
  //     //special character
  //     return "At least 1 special char [@$!%*?&]";
  //   } else if (password.length < 8) {
  //     return "At least 8 characters!";
  //   } else if (password.length > 16) {
  //     return "Maximum 16 characters!";
  //   } else {
  //     return "";
  //   }
  //length
  if (!/[A-Z]/.test(password)) {
    //upper
    setPassError("At least 1 uppercase char!!");
  } else if (!/[a-z]/.test(password)) {
    //lower
    setPassError("At least 1 lowercase char!!");
  } else if (!/[0-9]/.test(password)) {
    //number
    setPassError("At least 1 number!!");
  } else if (!/[@$!%*?&]/.test(password)) {
    //special character
    setPassError("At least 1 special char [@$!%*?&]");
  } else if (password.length < 8) {
    setPassError("At least 8 characters!");
  } else if (password.length > 16) {
    setPassError("Maximum 16 characters!");
  } else {
    setPassError("");
  }
};
