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
 * @swagger
 * /auth/login:
 *  post:
 *      description: Attempts to log a user in
 *      responses: 
 *          '201':
 *              description: Login successful, new access token sent back as JSON
 *          '400':
 *              description: Failed to log a user in
 *              
 */
router.post('/login', authController.Login);


/**
 * @swagger
 * /auth/validate:
 *  get:
 *      description: Checks if the sender is authorized
 *      responses: 
 *          '200':
 *              description: Token was valid, token data sent back as JSON
 *          '403':
 *              description: Token was INVALID or not provided in request authorization header
 *          '500':
 *              description: Server-side failed to verify access token
 *              
 */
router.get('/validate', authController.Validate);



//Exports the auth router
module.exports = router;