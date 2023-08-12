/**
 * User endpoints shared between Organizers and Attendees
 *
 */

//Import dependencies
require("dotenv").config();
const express = require("express");
const router = express.Router();
//Add handlers for endpoints
const UserController = require("../controller/user.controller");
const userController = new UserController();
const multer = require("multer");
//Image buffer for multipart form file
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
//Validation middleware
const { validate, processTokenData } = require("../validation/base.validator");
const { userSchemas } = require("../validation/user.schema");
const { checkSchema } = require("express-validator");

/**
 * POST -- Register a new user. userType can equal organizer or attendee.
 * firstName, lastName, and dob are Attendees-only.
 * organizationName is Organizer-only.
 */
router.post(
  "/register",
  checkSchema(userSchemas.registerUser),
  validate,
  userController.Create,
);

/**
 * PUT -- Resets user password.
 * BEARER TOKEN REQUIRED.
 */
router.put(
  "/reset-password",
  processTokenData,
  checkSchema(userSchemas.resetPassword),
  validate,
  userController.ResetPassword,
);

/**
 * PUT -- Update the user.
 * BEARER TOKEN REQUIRED.
 */
router.put(
  "/",
  processTokenData,
  checkSchema(userSchemas.updateUser),
  validate,
  upload.single("profile-img"),
  userController.Update,
);

/**
 * DELETE -- Delete the user.
 * BEARER TOKEN REQUIRED.
 */
router.delete("/", processTokenData, userController.Delete);

//Exports the user router
module.exports = router;
