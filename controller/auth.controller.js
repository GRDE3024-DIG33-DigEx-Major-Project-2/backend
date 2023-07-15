/**
 * Endpoint functions for auth-related tasks
 * 
 */



//Import dependencies
const authUtil = require("../util/auth.util");
const enumUtil = require("../util/enum.util");
const jwt = require('jsonwebtoken');
const { db } = require("../db/models/db");
//Load required db models for querying
const { Organizer, Attendee } = db.models;




//Endpoint actions for auth router
class AuthController {



    /**
     * Attempt to log a user in
     * @param {*} req 
     * @param {*} res 
     */
    Login = async (req, res) => {
console.log(req.body.email);
        //Check for email and password in body
        if (!req.body.email || !req.body.password) {
            return res.status(400).json({
                msg: "Please provide an email and password"
            });
        }

        //Search for user match in Attendee and Organizer tables
        try {
            console.log("begin");
            //Find Attendee match
            let user = await Attendee.findOne({ where: { email: req.body.email } });
            //Attendee match not found, search for Organizer match
            if (user == null) {
                user = await Organizer.findOne({ where: { email: req.body.email } });
                //User not found in Attendee or Organizer tables, send 400 response
                if (user == null)
                    return res.status(400).json({
                        msg: "Invalid credentials"
                    });
                //Organizer match found, verify password and attempt login
                else {
                    if (authUtil.verify(req.body.password, user.password)) {
                        const token = authUtil.generateJWT(user);
                        return res.status(201).json({
                            accessToken: token,
                            user: user
                        });
                    }
                    //Password invalid, send 400 response
                    else {
                        return res.status(400).json({
                            msg: "Invalid credentials"
                        });
                    }
                }
            }
            //Attendee match found, verify password and attempt login
            else {
                console.log("NOT NULL");
                console.log(req.body.password);
                console.log(user.password);
                if (authUtil.verify(req.body.password, user.password)) {
                    console.log("VALID");
                    const token = authUtil.generateJWT(user);
                    return res.status(201).json({
                        accessToken: token,
                        user: user,
                        userType: enumUtil.userTypes.attendee
                    });
                }
                //Password invalid, send 400 response
                else {
                    return res.status(400).json({
                        msg: "Invalid credentials"
                    });
                }
            }
        }
        //Catch error, log to console, and send detailed 400 response
        catch (reason) {
            let msg = "Failed to find user in database";
            console.log(msg);
            console.log(reason);
            return res.status(400).json({
                msg: msg,
                error: reason
            });
        }



    }


    /**
     * Validate a JWT token found in the request's Authorization header
     * @param {*} req 
     * @param {*} res 
     */
    Validate = async (req, res) => {

        
        //Deny if authorization header is empty
        if (req.headers.authorization === undefined)
            return res.sendStatus(403);

        //Get JWT from the authorization header
        const token = req.headers.authorization.split(' ')[1];

        try {
            //Verify JWT
            jwt.verify(token, process.env.JWTSECRET, (err, tokenData) => {
                if (err) {
                    //Token invalid, send 403 response    
                    return res.status(403).json({
                        err: "Forbidden"
                    });
                } else {
                    //Token is valid, send 200 response with token data
                    res.status(200).json(tokenData);
                }
            });
        }
        //Log error, send error response
        catch (err) {
            const msg = "Failed to verify access token";
            console.log(msg, err);
            res.status(500).json({
                msg: msg,
                error: err
            });
        }



    }







}




//Export the auth controller
module.exports = AuthController;