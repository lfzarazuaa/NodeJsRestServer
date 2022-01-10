const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, "The name is needed."],
  },
  email: {
    type: String,
    required: [true, "The email is needed."],
  },
  password: {
    type: String,
    required: [true, "The password is needed."],
  },
  img: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    // enum: ["ADMIN_ROLE", "USER_ROLE", "SALES_ROLE"],
  },
  state: {
      type: Boolean,
      default: true
  },
  isCreatedByGoogle: {
      type: Boolean,
      default: false
  }
});

module.exports = model("User", UserSchema) // Exports as a Mongoose object.
