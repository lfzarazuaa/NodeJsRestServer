const Role = require("../models/role"); // Import Role Schema

// Function for validating an existing Role.
const verifyValidRole = async (role = "notvalid") => {
    const roleExist = await Role.findOne({ role }); // Compares Role against DB.
    if (!roleExist) {
      // If not found.
      throw new Error(`The '${role}' is not registered as a Role in the DB`); // Custom handles the error to display and not crash.
    }
  };

module.exports = { verifyValidRole }