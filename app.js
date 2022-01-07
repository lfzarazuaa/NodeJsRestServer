require("dotenv").config(); //Read enviroment variables.

const Server = require('./models/server');

const server = new Server(); // Initializes the server.

server.listen() // Puts the WebApi to run with the specified endpoints.

