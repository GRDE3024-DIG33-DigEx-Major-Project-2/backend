/**
 * Seeding file
 */

'use strict';
const { v4: uuidv4 } = require('uuid');
const SeedData = require('../seed-data');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * Adds rows to database tables
   * @param {*} queryInterface 
   * @param {*} Sequelize 
   */
  async up(queryInterface, Sequelize) {

    let organizers = SeedData.getOrganizers();
    let attendees = SeedData.getAttendees();

    let events = SeedData.getEvents(organizers); 
    let tickets = SeedData.getTicketTypes();
    let tags = SeedData.getTags();

    let acts = SeedData.getActs();
    let performers = SeedData.getPerformers();
    let actPerformers = SeedData.getActPerformers(acts, performers);

    let eventTickets = SeedData.getEventTickets(events, tickets);
    let taggedWith = SeedData.getTaggedWith(events, tags);
    //let eventImgs = SeedData.getEventImgs();
    let eventActs = SeedData.getEventActs(events, acts);
    let favouritedBy = SeedData.getFavouritedBy(attendees, events);

    //Seed Organizers
    await queryInterface.bulkInsert('Organizers', organizers, {});
    //Seed Attendees
    await queryInterface.bulkInsert('Attendees', attendees, {});
    //Seed Events
    await queryInterface.bulkInsert('Events', events, {});
    //Seed Tickets
    await queryInterface.bulkInsert('TicketTypes', tickets, {});
    //Seed Tags
    await queryInterface.bulkInsert('Tags', tags, {});
    //Seed Acts
    await queryInterface.bulkInsert('Acts', acts, {});
    //Seed Performers
    await queryInterface.bulkInsert('Performers', performers, {});
    //Seed Performers of Acts
    await queryInterface.bulkInsert('ActPerformers', actPerformers, {});
    //Seed Event-Ticket pairs
    await queryInterface.bulkInsert('EventTickets', eventTickets, {});
    //Seed Event-Tag pairs
    await queryInterface.bulkInsert('TaggedWith', taggedWith, {});
    //Seed Event Images
    //await queryInterface.bulkInsert('EventImages', eventImgs, {});
    //Seed Event-Act pairs
    await queryInterface.bulkInsert('EventActs', eventActs, {});
    //Seed Favourited Events
    await queryInterface.bulkInsert('FavouritedBy', favouritedBy, {});

  },

  /**
   * Removes data from database tables
   * @param {*} queryInterface 
   * @param {*} Sequelize 
   * @returns 
   */
  async down(queryInterface, Sequelize) {

    //Empty Favourited Events
    await queryInterface.bulkDelete('FavouritedBy', null, {});
    //Empty Event Acts
    await queryInterface.bulkDelete('EventActs', null, {});
    //Empty Event Images
    //await queryInterface.bulkDelete('EventImages', null, {});    
    //Empty Event Tag pairs
    await queryInterface.bulkDelete('TaggedWith', null, {});
    //Empty Event Ticket pairs
    await queryInterface.bulkDelete('EventTickets', null, {});
    //Empty Performers of Acts
    await queryInterface.bulkDelete('ActPerformers', null, {});
    //Empty Performers
    await queryInterface.bulkDelete('Performers', null, {});
    //Empty Acts
    await queryInterface.bulkDelete('Acts', null, {});
    //Empty Tags
    await queryInterface.bulkDelete('Tags', null, {});
    //Empty Tickets
    await queryInterface.bulkDelete('TicketTypes', null, {});
    //Empty Events
    await queryInterface.bulkDelete('Events', null, {});
    //Empty Attendees
    await queryInterface.bulkDelete('Attendees', null, {});
    //Empty Organizers
    await queryInterface.bulkDelete('Organizers', null, {});

  }




};
