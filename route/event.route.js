/**
 * Event endpoints
 * 
 */


//Import dependencies
require("dotenv").config();
const express = require("express");
const router = express.Router();
//Add handlers for endpoints
// const UserController = require('../controller/user.controller');
// const userController = new UserController();





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
// router.post('/register', userController.Create);







// router.delete('/organizer/:id', userController.DeleteOrganizer);




// router.delete('/attendee/:id', userController.DeleteAttendee);





//Exports the user router
module.exports = router;