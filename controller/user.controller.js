/**
 * Endpoint functions for user-related tasks
 * 
 */



//Import dependencies
const enumUtil = require("../util/enum.util");
const { db } = require("../config/db");
//Load required db models for querying
const {Organizer, Attendee} = db.models;



//Endpoint actions for user routers
class UserController {



    /**
     * Register a new user
     * @param {*} req 
     * @param {*} res 
     */
    Create = async(req, res) => {


        //If body is empty, send 400 response
		if (!Object.keys(req.body).length) {
			return res.status(400).json({
				msg: "The user content is empty!"
			});
		}

        //If email is taken regardless of user type, return 400 response
        if (this.IsEmailTaken(enumUtil.userTypes.attendee, req, res) || this.IsEmailTaken(enumUtil.userTypes.organizer, req, res)) {
            let msg = "Email is taken already";
            console.log(msg);
            return res.status(400).json({
                msg: msg
            });
        }

        let user = null;

        //Create an Attendee
        if (req.body.userType == enumUtil.userTypes.attendee) {
            console.log("Init Attendee");
            user = await Attendee.create({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                dob:req.body.dob,
                email:req.body.email,
                password:req.body.password
            })
            .catch((reason) => {
                let msg = "Problem creating Attendee";
                console.log(msg);
                console.log(reason);
                return res.status(400).json({
                    msg: msg,
                    error: reason
                });
            });
          
        }
        //Create an organizer
        else if (req.body.userType == enumUtil.userTypes.organizer) {
            console.log("Init Organizer");
            user = await Organizer.create({
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                dob:req.body.dob,
                email:req.body.email,
                password:req.body.password,
                organizationName:req.body.organizationName
            })
            .catch((reason) => {
                let msg = "Problem creating Organizer";
                console.log(msg);
                console.log(reason);
                return res.status(400).json({
                    msg: msg,
                    error: reason
                });
            });
        }


        console.log("User created!");
        console.log(user.toJSON());


        //Send back 201 status wih the newly created user instance
		return res.status(201).json(user);

    }





    /**
     * Delete Attendee and relevant entities
     * @param {*} req 
     * @param {*} res 
     */
    DeleteAttendee = async(req, res) => {

        //Get id from request params
        const id = req.params.id;

        //Attempt to delete user
        let result = await Attendee.destroy({where:{id:id}});

        //No user was deleted
        if (result == 0) {
            let msg = "Failed to delete Attendee";
            console.log(msg);
            return res.status(400).json({
                msg: msg
            });
        }
        //User was deleted
        else {
            return res.status(200).json({
                msg: msg
            });
        }



        //TODO delete profile image

    }



    /**
     * Delete Organizer and relevant entities
     * @param {*} req 
     * @param {*} res 
     */
    DeleteOrganizer = async(req, res) => {

                //Get id from request params
                const id = req.params.id;

                //Attempt to delete user
                let result = await Organizer.destroy({where:{id:id}});
        
                //No user was deleted
                if (result == 0) {
                    let msg = "Failed to delete Attendee";
                    console.log(msg);
                    return res.status(400).json({
                        msg: msg
                    });
                }
                //User was deleted
                else {
                    return res.status(200).json({
                        msg: msg
                    });
                }


                //TODO delete profile image and event images from S3
                //TODO DELETE OBJECTS FROM OTHER MODELS

    }



    /**
     * Finds if the email is already taken
     * @param {String} userType attendee OR organizer
     * @returns {boolean | any} TRUE if email is taken, FALSE if not
     */
    IsEmailTaken(userType, req, res) {

        //Check Attendees for the email
        if (userType == enumUtil.userTypes.attendee)
        Attendee.findOne({ where:{email:req.body.email}})
        .then((value) => {
            //Exists, return true
            if (value != null)
            return true;
            //Doesn't exist, return false
            else return false;
        })
        .catch((reason) => {
            let msg = "Error occurred when checking if email is taken by an Attendee";
            console.log(msg);
            console.log(reason);
            return res.status(400).json({
                msg: msg,
                error: reason
            });
        });

        //Check Organizers for the email
        else if (userType == enumUtil.userTypes.organizer) {
            Organizer.findOne({ where:{email:req.body.email}})
            .then((value) => {
                //Exists, return true
                if (value != null)
                return true;
                //Doesn't exist, return false
                else return false;
            })
            .catch((reason) => {
                let msg = "Error occurred when checking if email is taken by an Organizer";
                console.log(msg);
                console.log(reason);
                return res.status(400).json({
                    msg: msg,
                    error: reason
                });
            });
        }

    }









}


//Export the user controller
module.exports = UserController;