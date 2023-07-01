/**
 * Endpoint functions for event-related tasks
 */



//REMINDER - WILL HANDLE ACT AND PERFORMER ENTITIES HERE AS WELL




//Import dependencies
const enumUtil = require("../util/enum.util");
const { db } = require("../config/db");
//Load required db models for querying
    //Defined models in Sequelize instance
    const { 
        Organizer, 
        Attendee,
        Act,
        Article,
        Blog,
        Event,
        ArticleImage,
        EventImage,
        Performer, 
        TicketType,
      } = sequelize.models;



      class EventController {


    /**
     * Create a new event
     * @param {*} req 
     * @param {*} res 
     */
    Create = async(req, res) => {


        //If body is empty, send 400 response
		if (!Object.keys(req.body).length) {
			return res.status(400).json({
				msg: "Request body is empty!"
			});
		}

        //

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



      }