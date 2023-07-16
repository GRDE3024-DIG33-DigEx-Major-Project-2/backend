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


//TODOTODOTODOTODO SCHEMAS
//TODOTODOTODOTODO SCHEMAS
//TODOTODOTODOTODO SCHEMAS
//TODOTODOTODOTODO SCHEMAS
//TODOTODOTODOTODO SCHEMAS
//TODOTODOTODOTODO SCHEMAS
//TODOTODOTODOTODO SCHEMAS



//TODO CREATE/UPDATE EVENT SCHEMAS INCOMPLETE
//TODO ADD PROPS
//TODO ENCODING ERROR FIX FOR MULTIPART/FORM-DATA

//Swagger UI schemas
/**
 * @swagger
 *  components:
 *      schemas:
 *          CreateEventReq:
 *              type: object
 *              properties:
 *                  event:
 *                      type: object
 *                  eventImg:
 *                      type: object
 *              required:
 *                  - todo
 *          UpdateEventReq:
 *              type: object
 *              properties:
 *                  todo:
 *                      type: string
 *              required:
 *                  - todo
 *          ToggleEventReq:
 *              type: object
 *              properties:
 *                  eventId:
 *                      type: string
 *              required:
 *                  - eventId
 *          SearchEventsReq:
 *              type: object
 *              properties:
 *                  offset:
 *                      type: number
 *              required:
 *                  - offset    
 *          FavouritedEventsReq:
 *              type: object
 *              properties:
 *                  offset:
 *                      type: number
 *              required:
 *                  - offset   
 *          OwnedEventsRequest:
 *              type: object
 *              properties:
 *                  offset:
 *                      type: number
 *              required:
 *                  - offset   
 * 
 * 
 * 
 */








/**
 * @swagger
 * /event:
 *  post:
 *      description: Create an event. BEARER TOKEN REQUIRED.
 *      requestBody:
 *         required: true
 *         content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/CreateEventReq'
 *              encoding:
 *                  event-img:
 *                      contentType: image/png, image/jpeg
 *      responses:
 *          '200':
 *              description: Event created
 *          '400':
 *              description: A problem occured when trying to create event
 *      security:
 *          - BearerAuth: []        
 */
router.post('/', upload.single('event-img'), eventController.Create);


/**
 * @swagger
 * /event:
 *  put:
 *      description: Update an event. BEARER TOKEN REQUIRED.
 *      requestBody:
 *         required: true
 *         content:
 *              multipart/form-data:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateEventReq'
 *              encoding:
 *                  event-img:
 *                      contentType: image/png, image/jpeg
 *      responses:
 *          '200':
 *              description: Event updated
 *          '400':
 *              description: A problem occured when trying to update event
 *      security:
 *          - BearerAuth: []        
 */
router.put('/', upload.single('event-img'), eventController.Update);

/**
 * @swagger
 * /event/toggle-favourite:
 *  post:
 *      description: Toggle event favourite. BEARER TOKEN REQUIRED.
 *      requestBody:
 *         required: true
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ToggleEventReq'
 *      responses:
 *          '200':
 *              description: Event favourited/unfavourited
 *          '400':
 *              description: A problem occured when trying to toggle event favourite status
 *      security:
 *          - BearerAuth: []        
 */
router.post('/toggle-favourite', eventController.ToggleFavourite);

/**
 * @swagger
 * /event/tags:
 *  get:
 *      description: Get all tags
 *      responses:
 *          '200':
 *              description: All tags
 *          '400':
 *              description: A problem occured when trying to get all tags      
 */
router.get('/tags', eventController.GetAllTags);

/**
 * @swagger
 * /event/{eventId}:
 *  get:
 *      parameters:
 *          name: eventId
 *          required: true
 *      description: Get event by id
 *      responses:
 *          '200':
 *              description: The event
 *          '400':
 *              description: A problem occured when trying to get the event   
 */
router.get('/:id', eventController.GetById);

/**
 * @swagger
 * /event/search-page:
 *  post:
 *      description: Returns page of events that match the filter and total page count. Max 10 events per page.
 *      requestBody:
 *         required: true
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/SearchEventsReq'
 *      responses:
 *          '200':
 *              description: Page of events with the total page count
 *          '400':
 *              description: A problem occured when trying to search events
 */
router.post('/search-page', eventController.SearchEvents);


/**
 * @swagger
 * /event/favourites:
 *  post:
 *      description: Returns page of favourited events that match the filter and total page count. Max 10 events per page.
 *      requestBody:
 *         required: true
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/FavouritedEventsRequest'
 *      responses:
 *          '200':
 *              description: Page of events with the total page count
 *          '400':
 *              description: A problem occured when trying to search events
 *      security:
 *          - BearerAuth: []        
 */
router.post('/favourites', eventController.GetFavourites);


/**
 * @swagger
 * /event/owned-events:
 *  post:
 *      description: Returns page of owned events that match the filter and total page count. Max 10 events per page.
 *      requestBody:
 *         required: true
 *         content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/OwnedEventsRequest'
 *      responses:
 *          '200':
 *              description: Page of events with the total page count
 *          '400':
 *              description: A problem occured when trying to search events
 *      security:
 *          - BearerAuth: []        
 */
router.post('/owned-events', eventController.GetOwnedEvents);

/**
 * @swagger
 * /event/{eventId}:
 *  delete:
 *      parameters:
 *          name: eventId
 *          required: true
 *      description: Delete event by id
 *      responses:
 *          '200':
 *              description: The event deleted successfully
 *          '400':
 *              description: A problem occured when trying to delete the event
 *      security:
 *          - BearerAuth: []   
 */
router.delete('/:id', eventController.DeleteEvent);

//Exports the event router
module.exports = router;