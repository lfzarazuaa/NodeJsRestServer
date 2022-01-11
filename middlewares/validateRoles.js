const { response, request } = require("express"); // For typing req and res.
// Authorize that the Authorized user is Admin.
const isAdminRole = async (req = response, res = request, next) => {
  if (!req.userAuthenticated) {
    return res.status(500).json({
      error: "Is needed to validate the token, before verifying the role.",
    });
  }
  if (req.userAuthenticated.role !== "ADMIN_ROLE") {
    return res.status(401).json({ error: "The user is not an Administrator." });
  }
  // Call the next function.
  next();
};

module.exports = { isAdminRole };
