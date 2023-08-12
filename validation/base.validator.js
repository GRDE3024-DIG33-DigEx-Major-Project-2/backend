/**
 * General-purpose validation middleware
 */

//Import the Express Validator middleware
const { validationResult } = require("express-validator");
require("dotenv").config();
const enumUtil = require("../util/enum.util");
const jwt = require("jsonwebtoken");

/**
 * Validates access token and sets access token data in request body
 * @returns 403 response or the next middleware
 */
const processTokenData = (req, res, next) => {
  let token;
  try {
    //Get JWT from the authorization header
    token = req.headers.authorization.split(" ")[1];
  } catch (err) {
    //Token invalid, send 403 response
    return res.status(403).json({
      err: "Forbidden",
    });
  }

  //Deny if authorization header is empty
  if (token === undefined) {
    console.error("Authorization header is undefined");
    return res.status(403).json({
      err: "Forbidden",
    });
  }

  let trimmedToken = req.headers.authorization;
  trimmedToken = token.replace("Bearer", "");
  trimmedToken = trimmedToken.replace(" ", "");

  if (trimmedToken.length == 0) {
    console.error("Authorization header does not contain access token");
    return res.status(403).json({
      err: "Forbidden",
    });
  } else {
    try {
      //Verify JWT
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, tokenData) => {
        if (err) {
          //Token invalid, send 403 response
          return res.status(403).json({
            err: "Forbidden",
          });
        } else {
          //Token is valid, add token data to request body and execute next middleware
          console.log("Passed auth header check");
          req.user = tokenData;
          return next();
        }
      });
    } catch (err) {
      //Log error, send error response
      const msg = "Failed to verify access token";
      console.log(msg, err);
      res.status(500).json({
        msg: msg,
        error: err,
      });
    }
  }
};

/**
 * Make sure the client's user type is Organizer
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const isOrganizer = (req, res, next) => {
  //If the usertype is not Organizer, send Forbidden response
  if (req.user.user.userType != enumUtil.userTypes.organizer) {
    const msg = "Organizers Only!";
    console.log(msg);
    return res.status(403).json({
      msg: msg,
    });
  }
  //Valid user type, execute next middleware
  return next();
};

/**
 * Make sure the client's user type is Attendee
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const isAttendee = (req, res, next) => {
  //If the usertype is not Organizer, send Forbidden response
  if (req.user.user.userType != enumUtil.userTypes.attendee) {
    const msg = "Attendees Only!";
    console.log(msg);
    return res.status(403).json({
      msg: msg,
    });
  }
  //Valid user type, execute next middleware
  return next();
};

/**
 * Performs validation check on Express Validator validation rule outcomes
 * @param {*} req Request object
 * @param {*} res Response object
 * @param {*} next The next handler (middleware)
 * @returns The request to the next handler
 */
const validate = (req, res, next) => {
  //Collect the error instances from the validation check
  const errors = validationResult(req);
  //No errors found --> Validation succeeded, so perform next middleware
  if (errors.isEmpty()) {
    console.log("No errors found");
    return next();
  }
  console.log("Errors found: " + errors.array().length);
  //Extract error messages from the array of error objects
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  //Log errors to console
  for (let msg of extractedErrors) console.log(msg);
  //Return 422 status response with all validation errors (422 is used for validation errors)
  return res.status(422).json({
    errors: extractedErrors,
  });
};

//Export base request validation functions
module.exports = {
  processTokenData,
  isAttendee,
  isOrganizer,
  validate,
};
