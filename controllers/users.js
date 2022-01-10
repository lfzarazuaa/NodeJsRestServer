const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const { parse, stringify } = require("flatted");

const User = require("../models/user");
const e = require("cors");
const { validationResult } = require("express-validator");

const usersGet = (req = request, res = response) => {
  const { name, id = 0, apiKey } = req.query; // Destructure the object.
  res.json({
    msg: "get API - controller",
    name,
    id,
    apiKey,
  });
};

const usersPost = async (req = request, res = response) => {
  // Read from body
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role }); // Create the instance for Mongoose.

  // Verify that the email is valid.
  const emailExist = await User.findOne({ email: email });
  if (emailExist) {
    // Error
    return res.status(400).json({
      error: `The email (${email}) already exist`,
    });
  }

  // Encrypt the password
  const salt = await bcryptjs.genSaltSync(15); // Number of interations complexity.
  user.password = bcryptjs.hashSync(password, salt); // Generate new password.

  // Save the user
  try {
    await user.save();
    res.json({
      msg: "User created",
      user,
    });
  } catch (error) {
    console.warn(error);
    res.json({
      msg: "There was an error",
      error,
    });
  }
};

const usersPut = (req, res = response) => {
  res.json({
    msg: "put API",
  });
};

const usersPatch = (req, res = response) => {
  res.status(400).json({
    msg: "patch API",
  });
};

const usersDelete = (req, res = response) => {
  res.json({
    msg: "delete API",
  });
};

module.exports = { usersGet, usersPost, usersPut, usersPatch, usersDelete };
