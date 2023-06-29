/**
 * Endpoint functions for auth-related tasks
 * 
 */



//Import dependencies
const authUtil = require("../util/auth.util");
const enumUtil = require("../util/enum.util");
const jwt = require('jsonwebtoken');
const { db } = require("../config/db");
//Load required db models for querying
const {Organizer, Attendee} = db.models;




//Endpoint actions for auth router
class AuthController {



    /**
     * Attempt to log a user in
     * @param {*} req 
     * @param {*} res 
     */
    Login = async(req, res) => {

		//Check for email and password in body
		if (!req.body.email || !req.body.password) {
			return res.status(400).json({
				msg: "Please provide an email and password"
			});
		}

        //Check for user type in body
        if (!req.body.userType) {
			return res.status(400).json({
				msg: "User type indicator is missing"
			});
        }

        //Find Attendee in database
        if (req.body.userType == enumUtil.userTypes.attendee) {
            Attendee.findOne({ where:{email:req.body.email}})
            .then((value) => {
                if (value == null) {
					return res.status(400).json({
						msg: "Invalid credentials"
					});
                }

                if (authUtil.verify(req.body.password, value.password)) {

                    const token = authUtil.generateJWT(value);

                    return res.status(201).json({
                        accessToken: token,
                        user: value
                    });

                }
            })
            .catch((reason) => {
                let msg = "Failed to find Attendee in database";
                console.log(msg);
                console.log(reason);
                return res.status(400).json({
                    msg: msg,
                    error: reason
                });
            });
        }
        //Find Organizer in database
        else if (req.body.userType == enumUtil.userTypes.organizer) {
            Organizer.findOne({ where:{email:req.body.email}})
            .then((value) => {
                if (value == null) {
					return res.status(400).json({
						msg: "Invalid credentials"
					});
                }

                if (authUtil.verify(req.body.password, value.password)) {

                    const token = authUtil.generateJWT(value);

                    return res.status(201).json({
                        accessToken: token,
                        user: value
                    });

                }
            })
            .catch((reason) => {
                let msg = "Failed to find Organizer in database";
                console.log(msg);
                console.log(reason);
                return res.status(400).json({
                    msg: msg,
                    error: reason
                });
            });
        }
        //Invalid user type specified
        else {
            return res.status(400).json({
                msg: "Invalid User Type"
            });
        }


    }


    /**
     * Validate a JWT token found in the request's Authorization header
     * @param {*} req 
     * @param {*} res 
     */
    Validate = async(req, res) => {

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