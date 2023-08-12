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
//Validation middleware
const { validate, processTokenData } = require("../validation/base.validator");
const { authSchemas } = require("../validation/auth.schema");
const { checkSchema } = require("express-validator");

/**
 * POST -- Attempts to log a user in.
 * userType can equal organizer or attendee
 */
router.post(
  "/login",
  checkSchema(authSchemas.login),
  validate,
  authController.Login,
);

/**
 * GET -- Checks if the sender is authorized through the token in the request Authorization header
 * BEARER TOKEN REQUIRED.
 */
router.get("/validate", processTokenData, authController.Validate);

/**
 * GET -- Generates a new pair of access and refresh tokens for user auth
 * BEARER TOKEN REQUIRED.
 */
router.get("/refresh-tokens", authController.RefreshToken);

//Exports the auth router
module.exports = router;
