const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express(); // Property on Server that executes an express server.
    this.port = process.env.PORT; // Get the port number value from enviroment.

    // Endpoints Strings
    this.usersPath = "/api/users";
    this.authPath = "/api/auth";

    // Connect to db
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Routes for my app.
    this.routes(); // Configure all the routes to have access.
  }

  async connectDB() {
    await dbConnection();
  }

  middlewares() {
    // Accept json in the body
    this.app.use(express.json());

    //Configure a whitelist using the cors
    this.app.use(cors());

    // Configure the Public Directory.
    this.app.use(express.static("public")); // Put on / the content of public.
  }

  // Method that configures all the endpoints of RESTServer
  routes() {
    // Middleware for routes with api/users
    this.app.use(this.usersPath, require("../routes/user"));
    this.app.use(this.authPath, require("../routes/auth"));
  }

  listen() {
    // Method for define the listining on th assigned port.
    this.app.listen(this.port, () => {
      console.log("Server running on port:", this.port);
    });
  }
}

module.exports = Server;
