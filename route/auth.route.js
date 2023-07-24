/**
 * Endpoints for authenticating user
 *
 */

//Import dependencies
require("dotenv").config();
const express = require("express");
const router = express.Router();
//Add handlers for endpoints
const AuthController = require("../controller/auth.controller");
const authController = new AuthController();

//Swagger UI schemas
/**
 * @swagger
 *  components:
 *      schemas:
 *          LoginReq:
 *              type: object
 *              properties:
 *                  email:
 *                      type: string
 *                      description: An existing user's email for login
 *                  password:
 *                      type: string
 *                      description: An existing user's password for login
 *              required:
 *                  - email
 *                  - password
 */

/**
 * @swagger
 * /auth/login:
 *  post:
 *      description: Attempts to log a user in. userType can equal organizer or attendee
 *      tags:
 *          - Auth Route
 *      requestBody:
 *         required: true
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/LoginReq'
 *      responses:
 *          '201':
 *              description: Login successful, new access token sent back as JSON
 *          '400':
 *              description: Failed to log a user in
 *
 */
router.post("/login", authController.Login);

/**
 * @swagger
 * /auth/validate:
 *  get:
 *      description: Checks if the sender is authorized through the token in the request Authorization header
 *      tags:
 *          - Auth Route
 *      responses:
 *          '200':
 *              description: Token was valid, token data sent back as JSON
 *          '403':
 *              description: Token was INVALID or not provided in request authorization header
 *          '500':
 *              description: Server-side failed to verify access token
 *      security:
 *          - BearerAuth: []
 *
 */
router.get("/validate", authController.Validate);

//Exports the auth router
module.exports = router;
