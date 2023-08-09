/**
 * Endpoint functions for auth-related tasks
 *
 */

//Import dependencies
const authUtil = require("../util/auth.util");
const jwt = require("jsonwebtoken");
const { db } = require("../db/models/db");
//Load required db models for querying
const { Organizer, Attendee } = db.models;

const GetUserHandler = require("../db/handlers/users/get.handler");

//Endpoint actions for auth router
class AuthController {
  /**
   * Attempt to log a user in
   * @param {*} req
   * @param {*} res
   */
  Login = async (req, res) => {
    //Get user data from db
    let user = await GetUserHandler.GetUserByEmail(req.body.email, res);
    //User found, verify password and attempt login
    if (user) {
      if (authUtil.verify(req.body.password, user.password)) {
        //Remove password hash from user data before returning to user
        delete user.dataValues.password;
        //Generate the access token and refresh token
        const accessToken = authUtil.generateAccessToken(user);
        const refreshToken = authUtil.generateRefreshToken(user);
        //Set refresh token as HTTP Only cookie
        console.clear();
        console.log("REF TOKEN: ", refreshToken);
        res.cookie("refreshToken", refreshToken);
        console.log("COOKIES: ", req.cookies);
        return res.status(201).json({
          accessToken: accessToken,
          user: user,
        });
      }
    } else return res.status(400).json({ msg: "User does not exist" });
  };

  /**
   * Validate a JWT token found in the request's Authorization header
   * @param {*} req
   * @param {*} res
   */
  Validate = async (req, res) => {
    //Get JWT from the authorization header
    const token = req.headers.authorization.split(" ")[1];

    try {
      //Verify JWT
      jwt.verify(token, process.env.JWTSECRET, (err, tokenData) => {
        if (err) {
          //Token invalid, send 403 response
          return res.status(403).json({
            err: "Forbidden",
          });
        } else {
          //Token is valid, send 200 response with token data
          res.status(200).json(tokenData);
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
  };

  /**
   * Generates a new set of access and refresh tokens for client user auth
   * @param {*} req
   * @param {*} res
   */
  RefreshToken = async (req, res) => {
    console.log("Inside refresh endpoint");
    try {
      const refreshToken = req.cookies.refreshToken;
      console.log("REF TOKEN: ", refreshToken);
      console.log("COOKIES: ", req.header("Cookie"));
      if (!refreshToken) {
        console.log("Refresh token not found in cookies");
        return res
          .status(401)
          .json({ msg: "Refresh token not found in cookies" });
      }

      const refreshTokenData = authUtil.decodeJWT(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
      );

      let user = await GetUserHandler.GetUserByEmail(refreshTokenData.aud, res);
      console.log("aud: ", refreshTokenData);
      console.log("USER: ", user);

      //Generate the access token and refresh token
      const accessToken = authUtil.generateAccessToken(user);
      const newRefreshToken = authUtil.generateRefreshToken(user);

      //Set refresh token as HTTP Only cookie
      res.cookie("refreshToken", newRefreshToken, { httpOnly: true });

      return res.status(201).json({
        accessToken: accessToken,
        user: user,
        value: true,
      });
    } catch (err) {
      console.log(err);
      return res
        .status(400)
        .json({ msg: "Failed to generate new JWT tokens", value: false });
    }
  };
}

//Export the auth controller
module.exports = AuthController;
