/**
 * Startup file of express app
 *
 * Author: Team X
 */

//IMPORT DEPENDENCIES ---------------------------------------------------------------------------
//Configure .env file support
require("dotenv").config();
const express = require("express");
//Enables CORS
const cors = require("cors");
//Swagger docs
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
//Set port number for app to listen to
const port = process.env.PORT || 3000;

//Clear console at the beginning of each startup
console.clear();

//EXPRESS APP SETUP ---------------------------------------------------------------------------
//Initialise Express app and configure services
app = express();
app.use(express.static("public"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use("*", cors());

//ROUTING SETUP ---------------------------------------------------------------------------
//Setup auth router
const authRouter = require("./route/auth.route");
app.use("/auth", authRouter);
//Setup user router
const userRouter = require("./route/user.route");
app.use("/user", userRouter);
//Setup event router
const eventRouter = require("./route/event.route");
app.use("/event", eventRouter);

//SWAGGER UI SETUP ---------------------------------------------------------------------------
const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Gignet Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a REST API application for Gigney made with Express and documented with Swagger UI",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
    },
    servers: [
      //Development on localhost using same host and port as server
      {
        url: `http://localhost:3000`,
      },
      //Live HTTPS API through the domain
      {
        url: "https://gigney.ryanriddiford.com",
      },
      //Live HTTP API through the EC2 instance
      {
        url: "http://gignet-api.ap-southeast-2.elasticbeanstalk.com",
      },
    ],
  },
  apis: ["./route/*.route.js"],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    requestBodies: {
      // Organizer: {
      //   description:"Organizer instance",
      //   required:true,
      //   content: {
      //     schema: {
      //       $ref: swaggerSchemas.organizer,
      //     }
      //   },
      // },
      // Attendee: {
      //   description:"Attendee instance",
      //   required:true,
      //   content: {
      //     schema: {
      //       $ref: swaggerSchemas.attendee,
      //     }
      //   },
      // },
    },
  },
};
const specs = swaggerJsdoc(options);
app.use(
  "/api-doc",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true }),
);

//LAUNCH ---------------------------------------------------------------------------
//Run the app. Listen on specified port
app.listen(port, () => {
  console.log("App is running on port " + port);
});
