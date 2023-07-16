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



//TODOTODOTODOTODO SCHEMAS
//TODOTODOTODOTODO SCHEMAS
//TODOTODOTODOTODO SCHEMAS
//TODOTODOTODOTODO SCHEMAS
//TODOTODOTODOTODO SCHEMAS
//TODOTODOTODOTODO SCHEMAS
//TODOTODOTODOTODO SCHEMAS


//TODO CREATE/UPDATE EVENT SCHEMAS INCOMPLETE
//TODO ADD PROPS
//TODO ENCODING ERROR FIX FOR MULTIPART/FORM-DATA


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
 *                  - userType
 *          ResetPasswordReq:
 *              type: object
 *              properties:
 *                  oldPassword:
 *                      type: string
 *                  newPassword:
 *                      type: string           
 *              required:
 *                  - oldPassword
 *                  - newPassword
 *          UpdateUserReq:
 *              type: object
 *              properties:
 *                  bio:
 *                      type: string
 *                  organizationName:
 *                      type: string  
 *                  phoneNumber:
 *                      type: string
 *                  imgFilename:
 *                      type: string         
 *                  firstName:
 *                      type: string
 *                  lastName:
 *                      type: string      
 *                  
 */



/**
 * @swagger
 * /user/register:
 *  post:
 *      description: Register a new user. userType can equal organizer or attendee. firstName, lastName, and dob are Attendees-only. organizationName is Organizer-only
 *      requestBody:
 *         required: true
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/RegisterReq'
 *      responses:
 *          '201':
 *              description: User created, returns user object in JSON
 *          '400':
 *              description: A problem occured when trying to register a new user
 *              
 */
router.post('/register', userController.Create);

/**
 * @swagger
 * /user/reset-password:
 *  put:
 *      description: Resets user password. BEARER TOKEN REQUIRED.
 *      requestBody:
 *         required: true
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ResetPasswordReq'
 *      responses:
 *          '200':
 *              description: User password successfully updated
 *          '400':
 *              description: A problem occured when trying to reset password
 *      security:
 *          - BearerAuth: []        
 */
router.put('/reset-password', userController.ResetPassword);

/**
 * @swagger
 * /user:
 *  put:
 *      description: Update the user. BEARER TOKEN REQUIRED. Fields may be inaccurate in documentation.
 *      requestBody:
 *         required: true
 *         content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateUserReq'
 *                  encoding:
 *                      profile-img:
 *                          contentType: image/png, image/jpeg
 *      responses:
 *          '201':
 *              description: 
 *          '400':
 *              description: A problem occured when trying to update user
 *      security:
 *          - BearerAuth: []        
 */
router.put('/', upload.single('profile-img'), userController.Update);

/**
 * @swagger
 * /user:
 *  delete:
 *      description: Delete the user. BEARER TOKEN REQUIRED.
 *      responses:
 *          '201':
 *              description: 
 *          '400':
 *              description: A problem occured when trying to delete user
 *      security:
 *          - BearerAuth: []        
 */
router.delete('/', userController.Delete);


//Exports the user router
module.exports = router;