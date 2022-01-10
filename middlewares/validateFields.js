const { validationResult } = require("express-validator"); // Validator as a middleware, before to call the function in the controller.
const { response, request } = require("express");

const validateFields = (req = response, res = request, next) => {
  // Read validator from express validators.
  
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  // Call the next function.
  next();
};

module.exports = { validateFields };
