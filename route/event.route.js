/**
 * Event endpoints
 * 
 */


//Import dependencies
require("dotenv").config();
const express = require("express");
const router = express.Router();
//Add handlers for endpoints
 const EventController = require('../controller/event.controller');
 const eventController = new UserController();





// //Swagger UI schemas
// /**
//  * @swagger
//  *  components:
//  *      schemas:
//  *          RegisterReq:
//  *              type: object
//  *              properties:
//  *                  firstName:
//  *                      type: string
//  *                  lastName:
//  *                      type: string
//  *                  dob:
//  *                      type: string
//  *                  email:
//  *                      type: string
//  *                  password:
//  *                      type: string
//  *                  userType:
//  *                      type: string
//  *                  organizationName:
//  *                      type: string                
//  *              required:
//  *                  - email
//  *                  - password
//  *                  - firstName
//  *                  - lastName
//  *                  - dob
//  *                  - userType
//  */



// /**
//  * @swagger
//  * /user/register:
//  *  post:
//  *      description: Register a new user. userType can equal organizer or attendee
//  *      requestBody:
//  *         required: true
//  *         content:
//  *              application/json:
//  *                  schema:
//  *                      $ref: '#/components/schemas/RegisterReq'
//  *      responses:
//  *          '201':
//  *              description: User created, returns user in JSON
//  *          '400':
//  *              description: A problem occured when trying to register a new user
//  *              
//  */





//POST EVENT
 router.post('/event', eventController.Create);


 //PUT EVENT


 //TOGGLE FAVOURITE EVENT


 //GET EVENTS


 //GET EVENT





 //DELETE EVENT





// router.delete('/organizer/:id', userController.DeleteOrganizer);




// router.delete('/attendee/:id', userController.DeleteAttendee);





//Exports the user router
module.exports = router;