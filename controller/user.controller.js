/**
 * Endpoint functions for user-related tasks
 * 
 */


//Import dependencies
const enumUtil = require("../util/enum.util");
const { db } = require("../db/models/db");
//Load required db models for querying
const { Organizer, Attendee } = db.models;
//Db handler for creating users
const CreateUserHandler = require("../db/handlers/users/create.handler");
//Db handler for deleting users
const DeleteUserHandler = require("../db/handlers/users/delete.handler");
//Auth-related utilities
const authUtil = require("../util/auth.util");


//Endpoint actions for user routers
class UserController {





    /**
     * Register a new user
     * @param {*} req 
     * @param {*} res 
     */
    Create = async (req, res) => {
        //If body is empty, send 400 response
        if (!Object.keys(req.body).length) {
            return res.status(400).json({
                msg: "The user content is empty!"
            });
        }
        //If email is taken regardless of user type, return 400 response
        if (CreateUserHandler.IsEmailTaken(enumUtil.userTypes.attendee, req.body.email, res)
            || CreateUserHandler.IsEmailTaken(enumUtil.userTypes.organizer, req.body.email, res)) {
            let msg = "Email is taken already";
            console.log(msg);
            return res.status(400).json({
                msg: msg
            });
        }
        //Create user in db
        const user = await CreateUserHandler.CreateUser(req.body, res);
        //Send back 201 status wih the newly created user instance
        return res.status(201).json({ user: user });
    }



    /**
     * Update a user
     * @param {*} req 
     * @param {*} res 
     */
    Update = async (req, res) => {

    }








    /**
     * Reset a user's password
     * @param {*} req 
     * @param {*} res 
     */
    ResetPassword = async (req, res) => {

        let decodedToken;
        let user;

        //Check for old password and new password in body
        if (!req.body.oldPassword || !req.body.newPassword) {
            return res.status(400).json({
                msg: "Please provide an old password and new password"
            });
        }
        //Deny if authorization header is empty
        if (req.headers.authorization === undefined)
            return res.sendStatus(403);
        //Get JWT from the authorization header
        const token = req.headers.authorization.split(' ')[1];
        //Retrieve user data from access token
        try {
            decodedToken = authUtil.decodeJWT(token);
        }
        //Log error, send error response
        catch (err) {
            const msg = "Failed to verify access token";
            console.log(msg, err);
            return res.status(500).json({
                msg: msg,
                error: err
            });
        }


        if (decodedToken.user.userType == enumUtil.userTypes.attendee)
        user = await Attendee.findByPk(decodedToken.user.id);
        else if (decodedToken.user.userType == enumUtil.userTypes.organizer)
        user = await Organizer.findByPk(decodedToken.user.id);

        //Verify current password
        if (authUtil.verify(req.body.oldPassword, user.password)) {
        //Update the user's password
        try {
            const result = await db.transaction(async (t) => {
                if (decodedToken.user.userType == enumUtil.userTypes.attendee) {
                    await Attendee.update({
                        password:req.body.newPassword
                    },
                    {where: {
                        id: decodedToken.user.id
                    }})
                    .then((value) => {
                //Send back 200 status after password updated
                return res.status(200).json({msg: "Successfully updated password"});                        
                    });
                }
                else if (decodedToken.user.userType == enumUtil.userTypes.organizer) {
                    await Organizer.update({
                        password:req.body.newPassword
                    },
                    {where: {
                        id: decodedToken.user.id
                    }})
                    .then((value) => {
                //Send back 200 status after password updated
                return res.status(200).json({msg: "Successfully updated password"});                        
                    });
                }

            });
        }
        catch (err) {
            const msg = "Failed to update password";
            console.log(msg, err);
            res.status(500).json({
                msg: msg,
                error: err
            });
        }
        }
        //Password invalid, send 400 response
        else {
            return res.status(400).json({
                msg: "Invalid credentials"
            });
        }




    }









    //TODO
    /**
     * Delete a user and all related data in db
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    Delete = async (req, res) => {

        //Deny if authorization header is empty
        if (req.headers.authorization === undefined)
            return res.sendStatus(403);
        //Get JWT from the authorization header
        const token = req.headers.authorization.split(' ')[1];
        //Retrieve user data from access token
        try {
            decodedToken = authUtil.decodeJWT(token);
        }
        //Log error, send error response
        catch (err) {
            const msg = "Failed to verify access token";
            console.log(msg, err);
            return res.status(500).json({
                msg: msg,
                error: err
            });
        }

        //TODO UNFINISHED
        //Delete event handler for org
        //Delete user for org and attendee
        //Delete user image
        //User type conditional
        if (decodedToken.user.userType == enumUtil.userTypes.attendee)
            await DeleteUserHandler.DeleteAttendee();
        else if (decodedToken.user.userType == enumUtil.userTypes.organizer)
            await DeleteUserHandler.DeleteOrganizer();


    }

}


//Export the user controller
module.exports = UserController;