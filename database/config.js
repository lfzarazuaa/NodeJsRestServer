const mongoose = require("mongoose");

// Function to connect to the database.
const dbConnection = async () => {
  try {
    //Connect to the db.
    await mongoose
      .connect(process.env.MONGODB_CNN, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log("Db connected");
  } catch (error) {
    console.log(error);
    throw new Error("Error at initializing the db.");
  }
};

module.exports = { dbConnection };
