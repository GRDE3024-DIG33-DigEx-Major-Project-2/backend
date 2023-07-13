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
router.put('/', upload.single('event-img'), eventController.Update);
//TOGGLE FAVOURITE EVENT
router.post('/toggle-favourite', eventController.ToggleFavourite);
//GET ALL TAGS
router.get('/tags', eventController.GetAllTags);
//GET EVENT BY ID
router.get('/:id', eventController.GetById);
//POST -- GET PAGINATION OF EVENTS
router.post('/search-page', eventController.SearchEvents);
//GET FAVOURITED EVENTS PAGE WITH FILTERS
router.post('/favourites', eventController.GetFavourites);
//GET YOUR CREATED EVENTS PAGE WITH FILTERS
router.post('/owned-events', eventController.GetOwnedEvents);
//DELETE EVENT
router.delete('/:id', eventController.DeleteEvent);

//Exports the event router
module.exports = router;