/**
 * Event endpoints
 * 
 */


//Import dependencies
require("dotenv").config();
const express = require("express");
const router = express.Router();
//Add handlers for endpoints
const EventController = require('../controller/event.controller');
const eventController = new EventController();
const multer = require("multer");
//Image buffer for multipart form file
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//POST EVENT
router.post('/', upload.single('event-img'), eventController.Create);


//PUT EVENT


//TOGGLE FAVOURITE EVENT


//GET EVENTS
router.get('/tags', eventController.GetTags)

//GET EVENT





//DELETE EVENT





// router.delete('/organizer/:id', userController.DeleteOrganizer);




// router.delete('/attendee/:id', userController.DeleteAttendee);





//Exports the event router
module.exports = router;