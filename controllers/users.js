const { response, request } = require("express");
const { encryptUserPassword } = require("../helpers/user");
const { parse, stringify } = require("flatted");

const User = require("../models/user");

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

  // Encrypt the password
  user.password = encryptUserPassword(password);

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

const usersPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, isCreatedByGoogle, ...otherData } = req.body;

  try {
    if (password) {
      // Encrypt password if received.
      otherData.password = await encryptUserPassword(password);
    }

    const user = await User.findByIdAndUpdate(id, otherData);

    res.json({
      msg: "User updated",
      user,
    });
  } catch (error) {
    res.json(error);
  }
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
