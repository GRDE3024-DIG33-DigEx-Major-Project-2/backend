/**
 * Startup file of express app
 * 
 * Author: Team X
 */



//IMPORT DEPENDENCIES ---------------------------------------------------------------------------
//Configure .env file support
require('dotenv').config();
const express = require("express");
//Enables CORS
const cors = require("cors");
//Swagger docs
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
//Set port number for app to listen to
const port = process.env.PORT || 3000;


//DATABASE SETUP ---------------------------------------------------------------------------
//Instantiate Sequelize instance (which uses db as alias name)
const { db } = require("./config/db");
//Sync database to match models. Force will also readd tables with changed properties...
db.sync({force: true});



// //AWS SETUP ---------------------------------------------------------------------------
// var AWS = require('aws-sdk');
// //Add config variables (credentials) to AWS instance. TODO SET UP AWS CREDENTIAL BEST PRACTICES FOR BOTH LOCAL AND LIVE SITE
// AWS.config.loadFromPath('../config.json');
// //S3 client instance. Use for object storage (images, files...)
// var s3 = new AWS.S3();
// /**
//  * Simple temporary test for s3 connection and permissions. Not complete.
//  */
// async function s3Test() {

//     //S3 test example
//   s3.listBuckets(function(err, data) {
//     if (err) {
//       console.log("Error", err);
//     } else {
//       console.log("Success", data.Buckets);
//     }
//   });
//   }
//Run the S3 test function
//s3Test();


//EXPRESS APP SETUP ---------------------------------------------------------------------------
//Initialise Express app and configure services
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));
app.use('*', cors());




//ROUTING SETUP ---------------------------------------------------------------------------
//Setup auth route
const authRouter = require('./route/auth.route');
app.use('/auth', authRouter);
//Setup user route
const userRouter = require('./route/user.route');
app.use('/user', userRouter);




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
        //Live API
        {
          url: "http://gignet-api.ap-southeast-2.elasticbeanstalk.com",
        }
      ],
    },
    apis: ["./route/*.route.js"],
    components: {
      securitySchemes: {
      BearerAuth:  {
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
    }
    },
  };
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-doc",
    swaggerUi.serve,
    swaggerUi.setup(specs, {explorer: true})
  );




//LAUNCH ---------------------------------------------------------------------------
//Run the app. Listen on specified port
app.listen(port, () => {
	console.log("App is running on port " + port);
});