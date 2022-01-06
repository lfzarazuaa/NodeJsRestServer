require("dotenv").config(); //Read enviroment variables.

const express = require("express");
const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
    console.log('Server running on port:', process.env.PORT)
} ); //Read the PORT value from enviroment.
