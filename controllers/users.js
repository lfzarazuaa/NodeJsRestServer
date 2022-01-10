const { response, request } = require("express");
const { encryptUserPassword } = require("../helpers/user");
const { parse, stringify } = require("flatted");

const User = require("../models/user");

const usersGet = async (req = request, res = response) => {
  const { limit = 5, begin = 0 } = req.query;
  const query = { state: true };
  const [users, total] = await Promise.all([
    User.find(query).limit(Number(limit)).skip(Number(begin)),
    User.countDocuments(query),
  ]);
  res.json({
    total,
    users,
  });
};

const usersPost = async (req = request, res = response) => {
  // Read from body
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role }); // Create the instance for Mongoose.

  // Encrypt the password
  user.password = await encryptUserPassword(password);

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

const usersDelete = async (req, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, {state: false})

  res.json({
    msg: "User deleted",
    user
  });
};

module.exports = { usersGet, usersPost, usersPut, usersPatch, usersDelete };
