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



/**
 * @swagger
 * /user/register:
 *  post:
 *      description: Register a new user
 *      responses:
 *          '201':
 *              description: User created, returns user in JSON
 *          '400':
 *              description: A problem occured when trying to register a new user
 *              
 */
router.post('/register', userController.Create);


//Exports the user router
module.exports = router;