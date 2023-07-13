/**
 * Create user db handler
 * 
 */

const enumUtil = require("../../../util/enum.util");
const { db } = require("../../../db/models/db");
//Load required db models for querying
const { Organizer, Attendee } = db.models;


class CreateUserHandler {

    constructor() {

    }


    /**
     * Creates either an attendee or organizer in the db
     * @returns The created user (attendee or organizer)
     */
    async CreateUser(data, res) {

        let user = null;
        console.log(data);

        //Create an Attendee
        if (data.userType == enumUtil.userTypes.attendee) {
            console.log("Init Attendee");
            user = await Attendee.create({
                firstName: data.firstName,
                lastName: data.lastName,
                bio: data.bio,
                dob: data.dob,
                email: data.email,
                password: data.password,
                imgUrl: data.imgUrl | null,
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
        else if (data.userType == enumUtil.userTypes.organizer) {
            console.log("Init Organizer");
            user = await Organizer.create({
                bio: data.bio,
                phoneNumber: data.phoneNumber,
                email: data.email,
                password: data.password,
                organizationName: data.organizationName,
                imgUrl: data.imgUrl | null,
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

        return user;

    }



    /**
    * Finds if the email is already taken
    * @param {String} userType attendee OR organizer
    * @returns {boolean | any} TRUE if email is taken, FALSE if not
    */
    IsEmailTaken(userType, email, res) {
        //Check Attendees for the email
        if (userType == enumUtil.userTypes.attendee)
            Attendee.findOne({ where: { email: email } })
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
            Organizer.findOne({ where: { email: email } })
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


//Export handler
module.exports = new CreateUserHandler();