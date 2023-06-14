/**
 * Startup file of express app
 * 
 * Author: Team X
 */



//Import dependencies
require("dotenv").config();
const express = require("express");
const cors = require("cors");
bodyParser = require("body-parser");
swaggerJsdoc = require("swagger-jsdoc");
swaggerUi = require("swagger-ui-express");
//Set port number for app to listen to
const port = process.env.PORT || 3000;



//Initialise Express app
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));
app.use('*', cors());




//ROUTING SETUP

//Setup test route
const testRouter = require('./route/test.route');
app.use('/test', testRouter);





//TODO LOOK AT SWAGGER UI DOCS MORE TODO TODO
//TODO LOOK AT SWAGGER JSDOCS SYNTAX AS WELL TODO TODO
//Swagger UI setup
const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Gignet Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a CRUD API application for Gigney made with Express and documented with Swagger",
          //TODO CHANGE LICENSE SPEC???
        license: {
          name: "MIT",
          url: "https://spdx.org/licenses/MIT.html",
        },
        //TODO REMOVE THIS SPEC IF WE DON'T HAVE A URL AND EMAIL
        contact: {
          name: "Gigney",
          url: "TODO",
          email: "TODO",
        },
      },
      //TODO live deployment url instead/also??? Need to look at Swagger UI docs more TODO TODO
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./route/*.route.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-doc",
    swaggerUi.serve,
    swaggerUi.setup(specs, {explorer: true})
  );

//Run the app. Listen on specified port
app.listen(port, () => {
	console.log("App is running on port " + port);
});