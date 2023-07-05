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

    let events = SeedData.getEvents();
    let tickets = SeedData.getTickets();
    let tags = SeedData.getTags();

    let acts = SeedData.getActs();
    let performers = SeedData.getPerformers();
    let actPerformers = SeedData.getActPerformers();

    let taggedWith = SeedData.getTaggedWith();
    let eventImgs = SeedData.getEventImgs();
    let eventActs = SeedData.getEventActs();
    let favouritedBy = SeedData.getFavouritedBy();


    
    //Seed Organizers
    await queryInterface.bulkInsert('Organizers', organizers, {});
    //Seed Attendees
    await queryInterface.bulkInsert('Attendees', attendees, {});
    //Seed Events
    await queryInterface.bulkInsert('Events', events, {});
    //Seed Tickets
    await queryInterface.bulkInsert('Tickets', tickets, {});
    //Seed Tags
    await queryInterface.bulkInsert('Tags', tags, {});
    //Seed Acts
    await queryInterface.bulkInsert('Acts', acts, {});
    //Seed Performers
    await queryInterface.bulkInsert('Performers', performers, {});
    //Seed Performers of Acts
    await queryInterface.bulkInsert('ActPerformers', actPerformers, {});
    //Seed Event Images
    await queryInterface.bulkInsert('EventImages', eventImgs, {});
    //Seed Event Acts
    await queryInterface.bulkInsert('EventActs', eventActs, {});
    //Seed Favourited Events
    await queryInterface.bulkInsert('FavouritedBy', favouritedBy, {});




  },

  /**
   * Removes rows from database tables
   * @param {*} queryInterface 
   * @param {*} Sequelize 
   * @returns 
   */
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    //TODO

    //queryInterface.bulkDelete('Organizers', null, {});



  }




};
