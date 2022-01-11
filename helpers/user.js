const User = require("../models/user"); // Import Role Schema

const bcryptjs = require("bcryptjs");
// Function for encrypting a password.
const encryptUserPassword = async (password = "") => {
  const salt = await bcryptjs.genSaltSync(15); // Number of interations complexity.
  password = bcryptjs.hashSync(password, salt).toString(); // Generate new password.
  return password;
};

const comparePassword = (password = "", passwordDb = "") => {
  return !bcryptjs.compareSync(password, passwordDb);
};
module.exports = { encryptUserPassword, comparePassword };
