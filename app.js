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
//PostgreSQL Client import
const { Client } = require('pg');
const { db } = require("./config/db");
/* require your db in you server.js, and sync it
  *{force: true} option will drop the table if it already exists and recreate it. 
*/
db.sync({force: true});


//AWS setup
var AWS = require('aws-sdk');
//Add config variables (credentials) to AWS instance
AWS.config.loadFromPath('./config.json');
var s3 = new AWS.S3();


//AWS S3 test example
async function s3Test() {

  //S3 test example
s3.listBuckets(function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Success", data.Buckets);
  }
});

}

//Run the S3 test function
//s3Test();


//TODO https://flaviocopes.com/sequelize/
//USE ABOVE LINK TO SETUP POSTGRESQL CODE FIRST STUFF IN THE OTHER FILES.
//FOCUS ON A WORKING CF DB INSANCE BEFORE OTHER CODING STUFF TODOTODO
//REAd above more importaNT BELOW
//https://codeburst.io/sequelize-migrations-setting-up-associations-985d29b61ee7



// //PostgreSQL test example
// async function dbTest() {

// console.log("in db test");

// //var connectionString = "Host=gignet.cykjmvxaizxv.ap-southeast-2.rds.amazonaws.com;Port=5432;Username=postgres;Password=gignet2023$$;Database=gignet;";

// //Connection info object
// const connectionInfo = {
//   user: "postgres",
//   database: "gignet",
//   port: "5432",
//   host: "gignet.cykjmvxaizxv.ap-southeast-2.rds.amazonaws.com",
//   password: "gignet2023$$", 
//   ssl: false,
// }

// //Instantiate pg client with connection info
// var client = new Client(connectionInfo);


// //Attempt pg connection
// await client.connect()
// //Connection success
// .then(async () => {
//   console.log("connection success");
//   //Test query
//   console.log(await client.query('SELECT $1::text as message', ['Hello world!']));
// await client.end();  
// })
// //Connection failed
// .catch((err) => {
//   console.log(err);
//   console.log("failed to connect to db");
// });

// }


// //Run the db test function
// dbTest();







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
        contact: {
          name: "Gigney",
          email: "gigney@email.com.au",
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