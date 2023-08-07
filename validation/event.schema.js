/**
 * Event endpoint request validation schemas
 */

const constantsUtil = require("../util/constants.util");
var validUrl = require("valid-url");

/**
 * Prevents creation of event with startDate set too early or before current date
 * @param {*} value
 * @returns
 */
const eventDateRange = (value) => {
  const currentDate = new Date();
  const targetDate = new Date(value);

  const timeDifference = targetDate.getTime() - currentDate.getTime();

  //Avoid events being set in the past
  if (currentDate > targetDate) throw new Error("Event cannot be in the past");

  //Restrict event creation to at least two days in future
  if (timeDifference >= 48 * 60 * 60 * 1000) return true;
  else throw new Error("startDate must be at least two days away on set");
};

/**
 * Validate that the optional purchaseUrl is a valid uri
 * @param {*} uri
 * @returns
 */
const uriCheck = (uri) => {
  if (validUrl.isUri(uri) === undefined) {
    throw new Error("Invalid purchase url for event");
  }
  return true;
};

/**
 * Event-related request schemas
 */
const eventSchemas = {
  //Toggle Favourite validators
  toggleFavourite: {
    eventId: {
      in: ["body"],
      isUUID: {
        version: "4",
      },
      errorMessage: "Invalid UUID format. Must be UUID V4",
    },
  },
  //Create Event validators
  createEvent: {
    event: {
      in: ["body"],
      custom: {
        options: (event) => {
          if (event.startDate > event.endDate)
            throw new Error("startDate must be earlier than endDate");
          else return true;
        },
      },
      isObject: true,
      errorMessage: "Error inside event request object",
    },
    "event.title": {
      in: ["body"],
      isString: true,
      errorMessage: "Invalid title field",
    },
    "event.venueName": {
      isString: true,
      errorMessage: "Invalid venue field",
    },
    "event.description": {
      isString: true,
      errorMessage: "Invalid description field",
    },
    "event.summary": {
      isString: true,
      errorMessage: "Invalid summary field",
    },
    "event.startDate": {
      isISO8601: true,
      custom: {
        options: eventDateRange,
      },
      errorMessage: "Invalid startDate field",
    },
    "event.endDate": {
      isISO8601: true,
      errorMessage: "Invalid endDate field",
    },
    "event.address": {
      isString: true,
      errorMessage: "Invalid address field",
    },
    "event.city": {
      isString: true,
      isIn: {
        options: [constantsUtil.CITIES],
        errorMessage:
          "The City must be one of the following: \n\n" +
          constantsUtil.CITIES.join(", "),
      },
      errorMessage: "Invalid City field",
    },
    "event.region": {
      isString: true,
      errorMessage: "Invalid region field",
    },
    "event.postcode": {
      isString: true,
      errorMessage: "Invalid postcode field",
    },
    "event.country": {
      isString: true,
      errorMessage: "Invalid country field",
    },
    "event.isFree": {
      isBoolean: true,
      errorMessage: "Invalid isFree field",
    },
    "event.purchaseUrl": {
      optional: { options: { nullable: true } },
      custom: {
        options: uriCheck,
      },
      isString: true,
      errorMessage: "Invalid purchaseUrl field",
    },
    acts: {
      in: ["body"],
      isArray: {
        options: { min: 0 },
      },
      optional: { options: { nullable: true } },
      custom: {
        options: (acts) => {
          if (Array.isArray(acts)) {
            for (let val of acts) {
              if (!val.name) throw new Error("acts must contain a name field");
              if (val.name == null) throw new Error("act name cannot be null");
            }
          }
          return true;
        },
      },
      errorMessage: "Invalid acts array",
    },
    ticketTypes: {
      in: ["body"],
      isArray: {
        options: { min: 0 },
      },
      optional: { options: { nullable: true } },
      custom: {
        options: (ticketTypes) => {
          if (Array.isArray(ticketTypes)) {
            for (let val of ticketTypes) {
              if (!val.name || !val.price)
                throw new Error(
                  "ticketTypes must contain a name and price field",
                );
              if (val.name == null)
                throw new Error("ticketType name cannot be null");
              if (Number.isNaN(Number.parseFloat(val.price)))
                throw new Error(
                  "ticketType price must be a decimal or integer",
                );
            }
          }
          return true;
        },
      },
      errorMessage: "Invalid ticketTypes array",
    },
    tags: {
      in: ["body"],
      isArray: {
        options: { min: 0 },
      },
      optional: { options: { nullable: true } },
      custom: {
        options: (tags) => {
          if (Array.isArray(tags)) {
            for (let val of tags) {
              if (!val.name || !val.id)
                throw new Error("tags must contain a name and id field");
              if (val.name == null) throw new Error("tag name cannot be null");
            }
          }
          return true;
        },
      },
      errorMessage: "Invalid tags array",
    },
    "tags.*.id": {
      isUUID: {
        version: "4",
      },
      optional: { options: { nullable: true } },
      isString: true,
      errorMessage: "Tag id must be UUIDV4 format",
    },
    filename: {
      in: ["body"],
      optional: { options: { nullable: true } },
      isString: true,
      errorMessage: "Invalid filename",
    },
  },
  //Create Event validators
  updateEvent: {
    event: {
      in: ["body"],
      isObject: true,
      errorMessage: "Error inside event request object",
    },
    "event.id": {
      isUUID: {
        version: "4",
        errorMessage: "event id must be in UUIDV4 format",
      },
      errorMessage: "event id is required",
    },
    "event.title": {
      in: ["body"],
      isString: true,
      optional: {
        options: { nullable: false },
        errorMessage: "event title cannot be null!",
      },
      errorMessage: "Invalid title field",
    },
    "event.venueName": {
      isString: true,
      optional: { options: { nullable: false } },
      errorMessage: "Invalid venue field",
    },
    "event.description": {
      isString: true,
      optional: { options: { nullable: false } },
      errorMessage: "Invalid description field",
    },
    "event.summary": {
      isString: true,
      optional: { options: { nullable: false } },
      errorMessage: "Invalid summary field",
    },
    "event.startDate": {
      isISO8601: true,
      optional: { options: { nullable: false } },
      errorMessage: "Invalid startDate field",
    },
    "event.endDate": {
      isISO8601: true,
      optional: { options: { nullable: false } },
      errorMessage: "Invalid endDate field",
    },
    "event.address": {
      isString: true,
      optional: { options: { nullable: false } },
      errorMessage: "Invalid address field",
    },
    "event.city": {
      isString: true,
      optional: { options: { nullable: false } },
      isIn: {
        options: [constantsUtil.CITIES],
        errorMessage:
          "The City must be one of the following: \n\n" +
          constantsUtil.CITIES.join(", "),
      },
      errorMessage: "Invalid City field",
    },
    "event.region": {
      isString: true,
      optional: { options: { nullable: false } },
      errorMessage: "Invalid region field",
    },
    "event.postcode": {
      isString: true,
      optional: { options: { nullable: false } },
      errorMessage: "Invalid postcode field",
    },
    "event.country": {
      isString: true,
      optional: { options: { nullable: false } },
      errorMessage: "Invalid country field",
    },
    "event.isFree": {
      isBoolean: true,
      optional: { options: { nullable: false } },
      errorMessage: "Invalid isFree field",
    },
    "event.purchaseUrl": {
      optional: { options: { nullable: true } },
      custom: {
        options: uriCheck,
      },
      isString: true,
      errorMessage: "Invalid purchaseUrl field",
    },
    acts: {
      in: ["body"],
      isArray: {
        options: { min: 0 },
      },
      optional: { options: { nullable: false } },
      custom: {
        options: (acts) => {
          if (Array.isArray(acts)) {
            for (let val of acts) {
              if (!val.name || !val.id)
                throw new Error("acts must contain a name and id field");
              if (val.name == null) throw new Error("act name cannot be null");
            }
          }
          return true;
        },
      },
      errorMessage: "Invalid acts array",
    },
    newActs: {
      in: ["body"],
      isArray: {
        options: { min: 0 },
      },
      optional: { options: { nullable: false } },
      custom: {
        options: (newActs) => {
          if (Array.isArray(newActs)) {
            for (let val of newActs) {
              if (!val.name)
                throw new Error("newAct must contain a name field");
              if (val.name == null)
                throw new Error("newAct name cannot be null");
            }
          }
          return true;
        },
      },
      errorMessage: "Invalid newActs array",
    },
    ticketTypes: {
      in: ["body"],
      isArray: {
        options: { min: 0 },
      },
      optional: { options: { nullable: false } },
      custom: {
        options: (ticketTypes) => {
          if (Array.isArray(ticketTypes)) {
            for (let val of ticketTypes) {
              if (!val.name || !val.price || !val.id)
                throw new Error(
                  "ticketTypes must contain an id, name, and price field",
                );
              if (val.name == null)
                throw new Error("ticketType name cannot be null");
              if (Number.isNaN(Number.parseFloat(val.price)))
                throw new Error(
                  "ticketType price must be a decimal or integer",
                );
            }
          }
          return true;
        },
      },
      errorMessage: "Invalid ticketTypes array",
    },
    newTicketTypes: {
      in: ["body"],
      isArray: {
        options: { min: 0 },
      },
      optional: { options: { nullable: false } },
      custom: {
        options: (newTicketTypes) => {
          if (Array.isArray(newTicketTypes)) {
            for (let val of newTicketTypes) {
              if (!val.name || !val.price)
                throw new Error(
                  "newTicketTypes must contain a name and price field",
                );
              if (val.name == null)
                throw new Error("newTicketType name cannot be null");
              if (Number.isNaN(Number.parseFloat(val.price)))
                throw new Error(
                  "newTicketType price must be a decimal or integer",
                );
            }
          }
          return true;
        },
      },
      errorMessage: "Invalid newTicketTypes array",
    },
    tags: {
      in: ["body"],
      isArray: {
        options: { min: 0 },
      },
      optional: { options: { nullable: false } },
      custom: {
        options: (tags) => {
          if (Array.isArray(tags)) {
            for (let val of tags) {
              if (!val.name || !val.id)
                throw new Error("tags must contain a name and id field");
              if (val.name == null)
                throw new Error("tag name name cannot be null");
            }
          }
          return true;
        },
      },
      errorMessage: "Invalid tags array",
    },
    "tags.*.id": {
      isUUID: {
        version: "4",
      },
      isString: true,
      errorMessage: "Tag id must be UUIDV4 format",
    },
    filename: {
      in: ["body"],
      optional: { options: { nullable: true } },
      isString: true,
      errorMessage: "Invalid filename",
    },
    eventImg: {
      in: ["body"],
      optional: { options: { nullable: true } },
      custom: {
        options: (eventImg) => {
          if (eventImg.id || eventImg.EventId || eventImg.filename) {
            if (!(eventImg.id && eventImg.EventId && eventImg.filename))
              throw new Error(
                "eventImg must contain id, EventId, and filename fields",
              );
            else return true;
          }
        },
      },
      isObject: true,
      errorMessage: "Error inside eventImg request object",
    },
    "eventImg.id": {
      optional: { options: { nullable: false } },
      isUUID: {
        version: "4",
        errorMessage: "eventImg id must be in UUIDV4 format",
      },
      errorMessage: "eventImg id is required",
    },
    "eventImg.EventId": {
      in: ["body"],
      optional: { options: { nullable: false } },
      isUUID: {
        version: "4",
        errorMessage: "eventImg EventId must be in UUIDV4 format",
      },
    },
    "eventImg.filename": {
      optional: { options: { nullable: false } },
      isString: true,
      errorMessage: "Invalid eventImg filename",
    },
  },
  //Search Event validators
  searchEvents: {
    page: {
      in: ["body"],
      isInt: {
        options: {
          min: 0,
        },
        errorMessage: "Page must be a non-negative integer",
      },
    },
    tags: {
      in: ["body"],
      isArray: {
        options: {
          min: 0,
        },
      },
      optional: { options: { nullable: true } },
      custom: {
        options: (value) => {
          if (!value.every((tag) => typeof tag === "string")) {
            throw new Error("tags must be an array of Strings!");
          }
          return true;
        },
      },
    },
    keywords: {
      in: ["body"],
      optional: { options: { nullable: true } },
      errorMessage: "Invalid keywords field",
    },
    minDate: {
      in: ["body"],
      optional: { options: { nullable: true } },
      isISO8601: true,
      errorMessage: "Invalid min date field",
    },
    maxDate: {
      in: ["body"],
      optional: { options: { nullable: true } },
      isISO8601: true,
      errorMessage: "Invalid max date field",
    },
    priceRange: {
      in: ["body"],
      optional: { options: { nullable: true } },
      isObject: true,
      custom: {
        options: (value) => {
          if (value.minPrice && !Number.isNaN(Number(value.minPrice))) {
            value.minPrice = Number(value.minPrice);
          } else {
            delete value.minPrice;
          }
          if (value.maxPrice && !Number.isNaN(Number(value.maxPrice))) {
            value.maxPrice = Number(value.maxPrice);
          } else {
            delete value.maxPrice;
          }
          if (value.minPrice && value.maxPrice)
            if (value.minPrice > value.maxPrice)
              throw new Error(
                "minPrice must be equal to, or greater than maxPrice!",
              );
          return true;
        },
      },
    },
    "priceRange.minPrice": {
      in: ["body"],
      optional: { options: { nullable: true } },
      isFloat: {
        options: {
          min: 0,
        },
        errorMessage: "minPrice must be a positive number",
      },
    },
    "priceRange.maxPrice": {
      in: ["body"],
      optional: { options: { nullable: true } },
      isFloat: {
        options: {
          min: 0,
        },
        errorMessage: "maxPrice must be a positive number",
      },
    },
    filename: {
      in: ["body"],
      optional: { options: { nullable: true } },
      isString: true,
      errorMessage: "Invalid filename",
    },
  },
  //Search Favourites validators
  searchFavourites: {
    page: {
      isInt: {
        options: {
          min: 0,
        },
        errorMessage: "Page must be a non-negative integer",
      },
    },
  },
  //Search Owned validators
  searchOwned: {
    page: {
      isInt: {
        options: {
          min: 0,
        },
        errorMessage: "Page must be a non-negative integer",
      },
    },
  },
};

//Export user-related schemas
module.exports = eventSchemas;
