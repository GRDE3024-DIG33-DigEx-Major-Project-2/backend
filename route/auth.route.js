/**
 * Endpoints for authenticating user
 * 
 */





//Import dependencies
require("dotenv").config();
const express = require("express");
const router = express.Router();
//Add handlers for endpoints
const AuthController = require('../controller/auth.controller');
const authController = new AuthController();

/**
 * POST - Attempts to log a user in
 */

router.post('/login', authController.Login);

/**
 * GET - Checks if the sender is authorized
 */
router.get('/validate', authController.Validate);



//Exports the auth router
module.exports = router;