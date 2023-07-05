/**
 * Seeding file
 */

'use strict';
const crypto = require('crypto');
const { DataTypes } = require('sequelize');


/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * Adds rows to database tables
   * @param {*} queryInterface 
   * @param {*} Sequelize 
   */
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let organizers = [
      {
        id: Sequelize.fn('gen_random_uuid'),
        firstName: 'Adam',
        lastName: 'Antonio',
        bio: null,
        organizationName: 'Adam\'s Venues',
        phoneNumber: '04123123',
        email: "adam@email.com",
        password: "abc123",
        imgUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: Sequelize.fn('gen_random_uuid'),
        firstName: 'Bill',
        lastName: 'Bo',
        bio: null,
        organizationName: 'Bill\'s Theaters',
        phoneNumber: '04321321',
        email: "bill@email.com",
        password: "abc123",
        imgUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }];

    let attendees = [
      {
        id: Sequelize.fn('gen_random_uuid'),
        firstName: 'Zelda',
        lastName: 'Peach',
        bio: null,
        dob: "01/01/2000",
        phoneNumber: '04123122',
        email: "zelda@email.com",
        password: "abc123",
        imgUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: Sequelize.fn('gen_random_uuid'),
        firstName: 'Xavier',
        lastName: 'Brown',
        bio: null,
        dob: "01/01/2001",
        phoneNumber: '04123125',
        email: "xavier@email.com",
        password: "abc123",
        imgUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }];

    let events = [
      {
        id: Sequelize.fn('gen_random_uuid'),
        title: 'Big Show',
        venueName: 'Arena 51',
        description: "Big Show description! FREE ENTRY",
        summary: "FREE SHOW IN SYDNEY",
        startDate: "1999-01-08",
        endDate: "1999-01-08",
        address: '123 Fake Street, Fake Suburb',
        city: "Sydney",
        region: "NSW",
        postcode: "2000",
        country: "Australia",
        isFree: true,
        imgUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: Sequelize.fn('gen_random_uuid'),
        title: 'Big Show 2',
        venueName: 'Arena 52',
        description: "Big Show description! PAID ENTRY",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "1999-01-08",
        endDate: "1999-01-08",
        address: '124 Fake Street, Fake Suburb',
        city: "Sydney",
        region: "NSW",
        postcode: "2000",
        country: "Australia",
        isFree: false,
        imgUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    let tickets = [{
      id: Sequelize.fn('gen_random_uuid'),
      eventId: events[1].id,
      name: "General",
      price: 19.99,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }];


    let tags = [{
      id: Sequelize.fn('gen_random_uuid'),
      name: "Rock",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }];

    let acts = [{
      id: Sequelize.fn('gen_random_uuid'),
      name: "The Chop",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }];

    let performers = [{
      id: Sequelize.fn('gen_random_uuid'),
      firstName: 'Adam',
      lastName: 'McDowell',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }];

    let actPerformers = [{
      ActId: acts[0].id,
      PerformerId: performers[0].id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }];

    let taggedWith = [
      {
        EventId: events[0].id,
        TagId: tags[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        EventId: events[1].id,
        TagId: tags[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];

    //TODO
    let eventImgs = [{
      // createdAt: new Date().toISOString(),
      // updatedAt: new Date().toISOString()
    }];

    let eventActs = [
      {
      EventId: events[0].id,
      ActId: acts[0].id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      EventId: events[1].id,
      ActId: acts[0].id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
  ];

    let favourites = [
      {
      AttendeeId: attendees[0].id,
      EventId:events[0].id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];



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
    await queryInterface.bulkInsert('EventActs', eventActs, {});




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
