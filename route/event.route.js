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
//Validation middleware
const {
  validate,
  processTokenData,
  isOrganizer,
  isAttendee,
  checkUUID,
} = require("../validation/base.validator");
const eventSchemas = require("../validation/event.schema");
const { checkSchema, param } = require("express-validator");

/**
 * POST -- Create an event.
 * BEARER TOKEN REQUIRED.
 */
router.post(
  "/",
  upload.single("event-img"),
  processTokenData,
  isOrganizer,
  checkSchema(eventSchemas.createEvent),
  validate,
  eventController.Create,
);

/**
 * PUT -- Update an event.
 * BEARER TOKEN REQUIRED.
 */
router.put(
  "/",
  upload.single("event-img"),
  processTokenData,
  isOrganizer,
  checkSchema(eventSchemas.updateEvent),
  validate,
  eventController.Update,
);

/**
 * POST -- Toggle event favourite.
 * BEARER TOKEN REQUIRED.
 */
router.post(
  "/toggle-favourite",
  processTokenData,
  isAttendee,
  checkSchema(eventSchemas.toggleFavourite),
  validate,
  eventController.ToggleFavourite,
);

/**
 * GET -- Get all tags defined in the database's Tag table
 */
router.get("/tags", eventController.GetAllTags);

/**
 * GET -- Get event by id
 */
router.get(
  "/:id",
  //UUIDV4 in param check
  param("id")
    .exists()
    .withMessage("id not provided in url param!")
    .bail()
    .isUUID(4)
    .withMessage("id must be UUIDV4 format!"),
  validate,
  eventController.GetById,
);

/**
 * POST -- Returns page of events that match the filter and total page count.
 * Max 10 events per page.
 */
router.post(
  "/search-page",
  checkSchema(eventSchemas.searchEvents),
  validate,
  eventController.SearchEvents,
);

/**
 * POST -- Returns page of favourited events that match the filter and total page count.
 * Max 10 events per page.
 * BEARER TOKEN REQUIRED.
 */
router.post(
  "/favourites",
  processTokenData,
  isAttendee,
  checkSchema(eventSchemas.searchFavourites),
  validate,
  eventController.GetFavourites,
);

/**
 * POST -- Returns page of owned events that match the filter and total page count.
 * Max 10 events per page.
 * BEARER TOKEN REQUIRED.
 */
router.post(
  "/owned-events",
  processTokenData,
  isOrganizer,
  checkSchema(eventSchemas.searchOwned),
  validate,
  eventController.GetOwnedEvents,
);

/**
 * DELETE -- Delete event by id.
 * BEARER TOKEN REQUIRED.
 */
router.delete(
  "/:id",
  processTokenData,
  isOrganizer,
  //UUIDV4 in param check
  param("id")
    .exists()
    .withMessage("id not provided in url param!")
    .bail()
    .isUUID(4)
    .withMessage("id must be UUIDV4 format!"),
  validate,
  eventController.DeleteEvent,
);


/**
 * GET -- Finds if event is favourited already. True if favourited, else false
 */
router.post(
  "/is-favourited",
  processTokenData,
  isAttendee,
  validate,
  eventController.IsFavourite,
);

//Exports the event router
module.exports = router;
