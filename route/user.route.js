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
 * POST - Register a new user
 */

router.post('/register', userController.Create);


//Exports the user router
module.exports = router;