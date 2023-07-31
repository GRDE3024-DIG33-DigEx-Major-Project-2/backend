/**
 * Startup file of express app
 *
 */

//IMPORT DEPENDENCIES ---------------------------------------------------------------------------
//Configure .env file support
require("dotenv").config();
const express = require("express");
//Enables CORS
const cors = require("cors");
const cookieParser = require("cookie-parser");
//Swagger docs
const swaggerUi = require("swagger-ui-express");
//Set port number for app to listen to
const port = process.env.PORT || 3000;

//EXPRESS APP SETUP ---------------------------------------------------------------------------
//Initialise Express app and configure services
const app = express();
//Use defined static paths
app.use(express.static("Public"));
//Use body parsing middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
//Enable cookies
app.use(cookieParser());
//Enable unrestricted CORS
app.use("*", cors());

console.clear();

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

//Load Swagger UI JSON documentation
const docFiles = {
  paths: {
    user: require("./swagger-ui-docs/paths/user.json"),
    auth: require("./swagger-ui-docs/paths/auth.json"),
    event: require("./swagger-ui-docs/paths/event.json"),
  },
  schemas: {
    user: require("./swagger-ui-docs/schemas/user.json"),
    auth: require("./swagger-ui-docs/schemas/auth.json"),
    event: require("./swagger-ui-docs/schemas/event.json"),
  },
};

//Load swagger specs into options object
const swaggerOptions = {
  openapi: "3.1.0",
  info: {
    title: "Gignet Express API with Swagger",
    version: "0.2.0",
    description:
      "This is a REST API application for Gigney made with Express and documented with Swagger UI",
    license: {
      name: "MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
  },
  servers: [
    {
      url: "http://localhost:3000", // Development on localhost using the same host and port as the server
    },
    {
      url: "https://a2.gigney.ryanriddiford.com", // A2 -- Live HTTPS API through the domain
    },
    {
      url: "http://gignet-api.ap-southeast-2.elasticbeanstalk.com", // A2 -- Live HTTP API through the EC2 instance
    },
    {
      url: "https://a2.gigney.ryanriddiford.com", // A3 Live HTTPS API through the domain
    },
  ],
  apis: ["./route/*.route.js"],
  paths: {
    //Auth endpoint paths
    "/auth/login": docFiles.paths.auth["/auth/login"],
    "/auth/validate": docFiles.paths.auth["/auth/validate"],
    "/auth/refresh-tokens": docFiles.paths.auth["/auth/refresh-tokens"],
    //User endpoint paths
    "/user": docFiles.paths.user["/user"],
    "/user/register": docFiles.paths.user["/user/register"],
    "/user/reset-password": docFiles.paths.user["/user/reset-password"],
    //Event endpoint paths
    "/event": docFiles.paths.event["/event"],
    "/event/toggle-favourite": docFiles.paths.event["/event/toggle-favourite"],
    "/event/tags": docFiles.paths.event["/event/tags"],
    "/event/{eventId}": docFiles.paths.event["/event/{eventId}"],
    "/event/search-page": docFiles.paths.event["/event/search-page"],
    "/event/favourites": docFiles.paths.event["/event/favourites"],
    "/event/owned-events": docFiles.paths.event["/event/owned-events"],
    "/event/{eventId}": docFiles.paths.event["/event/{eventId}"],
  },
  components: {
    schemas: {
      //Auth endpoint schemas
      Login: docFiles.schemas.auth["Login"],
      //User endpoint schemas
      Register: docFiles.schemas.user["Register"],
      ResetPassword: docFiles.schemas.user["ResetPassword"],
      UpdateUser: docFiles.schemas.user["UpdateUser"],
      //Event endpoint schemas
      CreateEvent: docFiles.schemas.event["CreateEvent"],
      UpdateEvent: docFiles.schemas.event["UpdateEvent"],
      ToggleEvent: docFiles.schemas.event["ToggleEvent"],
      SearchEvents: docFiles.schemas.event["SearchEvents"],
      FavouritedEvents: docFiles.schemas.event["FavouritedEvents"],
      OwnedEvents: docFiles.schemas.event["OwnedEvents"],
    },
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    requestBodies: {},
  },
};

//Create the Swagger UI API documentation route
app.use(
  ["/api-doc", ""],
  swaggerUi.serve,
  swaggerUi.setup(swaggerOptions, { explorer: true }),
);

//LAUNCH ---------------------------------------------------------------------------
//Run the app. Listen on specified port
app.listen(port, () => {
  console.log("App is running on port " + port);
});
