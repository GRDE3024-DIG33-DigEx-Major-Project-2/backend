/**
 * Event endpoints
 *
 */

//Import dependencies
require("dotenv").config();
const express = require("express");
const router = express.Router();
//Add handlers for endpoints
const EventController = require("../controller/event.controller");
const eventController = new EventController();
const multer = require("multer");
//Image buffer for multipart form file
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
 *                      properties:
 *                          id:
 *                              type: string
 *                          title:
 *                              type: string
 *                          venueName:
 *                              type: string
 *                          description:
 *                              type: string
 *                          summary:
 *                              type: string
 *                          startDate:
 *                              type: string
 *                          endDate:
 *                              type: string
 *                          address:
 *                              type: string
 *                          city:
 *                              type: string
 *                          region:
 *                              type: string
 *                          postcode:
 *                              type: string
 *                          country:
 *                              type: string
 *                          isFree:
 *                              type: boolean
 *                          purchaseUrl:
 *                              type: string
 *                  acts:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                  ticketTypes:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                              price:
 *                                  type: string
 *                  tags:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: string
 *                              name:
 *                                  type: string
 *                                  description: The tag's name
 *                  filename:
 *                      type: string
 *                      description: The filename of the event image, without the filename extension
 *                  event-img:
 *                      type: string
 *                      format: base64
 *                      description: The event image file to upload
 *              required:
 *                  - event
 *                  - acts
 *                  - tags
 *                  - ticketTypes
 *          UpdateEventReq:
 *              type: object
 *              properties:
 *                  event:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                          title:
 *                              type: string
 *                          venueName:
 *                              type: string
 *                          description:
 *                              type: string
 *                          summary:
 *                              type: string
 *                          startDate:
 *                              type: string
 *                          endDate:
 *                              type: string
 *                          address:
 *                              type: string
 *                          city:
 *                              type: string
 *                          region:
 *                              type: string
 *                          postcode:
 *                              type: string
 *                          country:
 *                              type: string
 *                          isFree:
 *                              type: boolean
 *                          purchaseUrl:
 *                              type: string
 *                  acts:
 *                      type: array
 *                      description: Current acts before update. Acts that you want removed should be absent from it.
 *                      items:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                  newActs:
 *                      type: array
 *                      description: Acts that you want to add.
 *                      items:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                  ticketTypes:
 *                      type: array
 *                      description: Current tickets before update. Tickets that you want removed should be absent from it.
 *                      items:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                              price:
 *                                  type: string
 *                  newTicketTypes:
 *                      type: array
 *                      description: Ticket types that you want to add.
 *                      items:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                              price:
 *                                  type: string
 *                  tags:
 *                      type: array
 *                      description: The updated list of tags you want associated with the event.
 *                      items:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: string
 *                              name:
 *                                  type: string
 *                                  description: The tag's name
 *                  eventImg:
 *                      type: object
 *                      description: The event image table row. Contains the filename of the related event's image. To remove the event image without replacement, send eventImg as null.
 *                      properties:
 *                          id:
 *                              type: string
 *                          filename:
 *                              type: string
 *                              description: The filename of the S3-stored image, without the filename extension
 *                          EventId:
 *                              type: string
 *                              description: The FK of the Event table row
 *                  filename:
 *                      type: string
 *                      description: The filename of the event image, without the filename extension
 *                  event-img:
 *                      type: string
 *                      format: base64
 *                      description: The event image file to upload
 *              required:
 *                  - event
 *                  - acts
 *                  - tags
 *                  - ticketTypes
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
 *                  page:
 *                      type: number
 *                      description: The page you want to retrieve (0 would be the first page)
 *                  tags:
 *                      type: array
 *                      description: This is a String array that contains the ids of all tags you want to be associated with the Events that are in the search result. Events must be associated with ALL tags
 *                      items:
 *                          type: string
 *                          description: The id (Primary Key) of a Tag row in the database.
 *                  keywords:
 *                      type: string
 *                      description: Keywords that may match an act name, event title, or venue (Not Functional)
 *                  startDate:
 *                      type: string
 *                      description: The date the event starts (Not Functional)
 *                  priceRange:
 *                      type: object
 *                      description: Contains the min-max for ticket price (Not Functional)
 *                      properties:
 *                          minPrice:
 *                              type: string
 *                              description: The minimum price for the event's tickets
 *                          maxPrice:
 *                              type: string
 *                              description: The maximum price for the event's tickets
 *                  city:
 *                      type: string
 *                      description: The city the event is held in
 *              required:
 *                  - page
 *          FavouritedEventsReq:
 *              type: object
 *              properties:
 *                  page:
 *                      type: number
 *                      description: The page you want to retrieve (0 would be the first page)
 *              required:
 *                  - page
 *          OwnedEventsRequest:
 *              type: object
 *              properties:
 *                  page:
 *                      type: number
 *                      description: The page you want to retrieve (0 would be the first page)
 *              required:
 *                  - page
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
router.post("/", upload.single("event-img"), eventController.Create);

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
router.put("/", upload.single("event-img"), eventController.Update);

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
router.post("/toggle-favourite", eventController.ToggleFavourite);

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
router.get("/tags", eventController.GetAllTags);

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
router.get("/:id", eventController.GetById);

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
router.post("/search-page", eventController.SearchEvents);

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
router.post("/favourites", eventController.GetFavourites);

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
router.post("/owned-events", eventController.GetOwnedEvents);

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
router.delete("/:id", eventController.DeleteEvent);

//Exports the event router
module.exports = router;
