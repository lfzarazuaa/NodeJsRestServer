const jwt = require("jsonwebtoken");

const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload, // Data on the token
      process.env.SECRET_OR_PRIVATE_KEY, // Sign the token
      { expiresIn: "4h" },
      (error, token) => {
        // Return the token or the error.
        if (error) {
          reject("There was a problem generating the token.");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { generateJWT };
