const { response, request } = require("express");
const { parse, stringify } = require("flatted");

const { comparePassword } = require("../helpers/user");
const { generateJWT } = require("../helpers/generate-jwt");
const User = require("../models/user");

const userLogin = async (req = request, res = response) => {
  try {
    const { password, email } = req.body;
    // Verify that email exist
    const user = await User.findOne({ email: email });
    if (!user || !user.state || comparePassword(password, user.password)) {
      return res.status(400).json({
        error: "The user or password is incorrect.",
      });
    }

    //Generate JWT
    const token = await generateJWT(user.id);

    res.json({
      user,
      msg: "Login Ok",
      token
    });
  } catch (error) {
    console.warn(error);
    return res.status(500).json({
      msg: "There was an error",
    });
  }
};

module.exports = { userLogin };
