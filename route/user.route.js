/**
 * User endpoints shared between Organizers and Attendees
 * 
 */


//Import dependencies
require("dotenv").config();
const express = require("express");
const router = express.Router();
//Add handlers for endpoints
const UserController = require('../controller/user.controller');
const userController = new UserController();
const multer = require("multer");
//Image buffer for multipart form file
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


//Swagger UI schemas
/**
 * @swagger
 *  components:
 *      schemas:
 *          RegisterReq:
 *              type: object
 *              properties:
 *                  firstName:
 *                      type: string
 *                  lastName:
 *                      type: string
 *                  dob:
 *                      type: string
 *                  email:
 *                      type: string
 *                  password:
 *                      type: string
 *                  userType:
 *                      type: string
 *                  organizationName:
 *                      type: string                
 *              required:
 *                  - email
 *                  - password
 *                  - firstName
 *                  - lastName
 *                  - dob
 *                  - userType
 */



/**
 * @swagger
 * /user/register:
 *  post:
 *      description: Register a new user. userType can equal organizer or attendee
 *      requestBody:
 *         required: true
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/RegisterReq'
 *      responses:
 *          '201':
 *              description: User created, returns user in JSON
 *          '400':
 *              description: A problem occured when trying to register a new user
 *              
 */
router.post('/register', userController.Create);
//router.post('/register', multer(upload.single), userController.Create);
//UPDATE PASSWORD
router.put('/reset-password', userController.ResetPassword);
//UPDATE USER
router.put('/', upload.single('profile-img'), userController.Update);
//DELETE USER
router.delete('/', userController.Delete);


//Exports the user router
module.exports = router;