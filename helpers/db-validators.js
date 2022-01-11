const Role = require("../models/role"); // Import Role Schema
const User = require("../models/user"); // Import User Schema

// Function for validating an existing Role.
const verifyValidRoleUpdate = async (role) => {
  if (!role) {
    await verifyValidRole(role);
  }
};

// Function for validating an existing Role.
const verifyValidRole = async (role = "notvalid") => {
  const roleExist = await Role.findOne({ role }); // Compares Role against DB.
  if (!roleExist) {
    // If not found.
    throw new Error(`The '${role}' is not registered as a Role in the DB`); // Custom handles the error to display and not crash.
  }
};

// Function for validating an existing Email.
const verifyEmailExist = async (email = "notvalid") => {
  // Verify that the email is valid.
  const emailExist = await User.findOne({ email: email });
  if (emailExist) {
    throw new Error(`The email '${email}' already exist.`); // Custom handles the error to display and not crash.
  }
};

// Function for validating an existing Email.
const verifyUserExist = async (id) => {
  // Verify that the id is registrated.
  const user = await User.findById(id);
  if (!user) {
    throw new Error(`The user wasn't found`); // Custom handles the error to display and not crash.
  }
  if (!user.state) {
    throw new Error(`The user don't exist more.`); // Custom handles the error to display and not crash.
  }
};

module.exports = {
  verifyValidRole,
  verifyEmailExist,
  verifyUserExist,
  verifyValidRoleUpdate,
};
