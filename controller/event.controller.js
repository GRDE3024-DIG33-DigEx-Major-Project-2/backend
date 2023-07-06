/**
 * Endpoint functions for event-related tasks
 */

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


        //req.body.event

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


        //TODO
        //JWT

        let event = null;

        //Create an Attendee
        if (req.body.userType == enumUtil.userTypes.attendee) {
            console.log("Init Attendee");
            event = await Attendee.create({
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


        console.log("User created!");
        console.log(event.toJSON());


        //Send back 201 status wih the newly created user instance
		return res.status(201).json(event);

    }



      }