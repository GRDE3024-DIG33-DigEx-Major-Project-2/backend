/**
 * Data seeding file
 */

"use strict";
const SeedData = require("../seed-data");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * Adds rows to database tables
   * @param {*} queryInterface
   * @param {*} Sequelize
   */
  async up(queryInterface, Sequelize) {
    //Get user data (Attendees and Organizers)
    let organizers = SeedData.getOrganizers();
    let attendees = SeedData.getAttendees();
    //Get event data and associated table data
    let events = SeedData.getEvents(organizers);
    let tickets = SeedData.getTicketTypes();
    let tags = SeedData.getTags();
    let acts = SeedData.getActs();
    let eventTickets = SeedData.getEventTickets(events, tickets);
    let taggedWith = SeedData.getTaggedWith(events, tags);
    let eventImgs = SeedData.getEventImgs(events);
    let eventActs = SeedData.getEventActs(events, acts);
    //Get junction data for Attendee and Event
    let favouritedBy = SeedData.getFavouritedBy(attendees, events);

    //Seed Organizers
    await queryInterface.bulkInsert("Organizer", organizers, {});
    //Seed Attendees
    await queryInterface.bulkInsert("Attendee", attendees, {});
    //Seed Events
    await queryInterface.bulkInsert("Event", Object.values(events).flat(), {});
    //Seed Tickets
    await queryInterface.bulkInsert("TicketType", tickets, {});
    //Seed Tags
    await queryInterface.bulkInsert("Tag", tags, {});
    //Seed Acts
    await queryInterface.bulkInsert("Act", acts, {});
    //Seed Event-Ticket pairs
    await queryInterface.bulkInsert("EventTicket", eventTickets, {});
    //Seed Event-Tag pairs
    await queryInterface.bulkInsert("TaggedWith", taggedWith, {});
    //Seed Event Images
    if (eventImgs.length > 0)
      await queryInterface.bulkInsert("EventImage", eventImgs, {});
    //Seed Event-Act pairs
    await queryInterface.bulkInsert("EventAct", eventActs, {});
    //Seed Favourited Events
    await queryInterface.bulkInsert("FavouritedBy", favouritedBy, {});
  },

  /**
   * Removes data from database tables
   * @param {*} queryInterface
   * @param {*} Sequelize
   * @returns
   */
  async down(queryInterface, Sequelize) {
    //Empty Favourited Events
    await queryInterface.bulkDelete("FavouritedBy", null, {});
    //Empty Event Acts
    await queryInterface.bulkDelete("EventAct", null, {});
    //Empty Event Images
    await queryInterface.bulkDelete("EventImage", null, {});
    //Empty Event Tag pairs
    await queryInterface.bulkDelete("TaggedWith", null, {});
    //Empty Event Ticket pairs
    await queryInterface.bulkDelete("EventTicket", null, {});
    //Empty Acts
    await queryInterface.bulkDelete("Act", null, {});
    //Empty Tags
    await queryInterface.bulkDelete("Tag", null, {});
    //Empty Tickets
    await queryInterface.bulkDelete("TicketType", null, {});
    //Empty Events
    await queryInterface.bulkDelete("Event", null, {});
    //Empty Attendees
    await queryInterface.bulkDelete("Attendee", null, {});
    //Empty Organizers
    await queryInterface.bulkDelete("Organizer", null, {});
  },
};
