/**
 * Seed data for use in seeder files
 */


//Import dependencies
const { v4: uuidv4 } = require('uuid');
const enumUtil = require('../util/enum.util');


/**
 * Seed data for use in seeder files
 */
class SeedData {



  /**
   * Organizers to seed database with
   * @returns Array of Organizers
   */
  getOrganizers() {
    return [
      {
        id: uuidv4(),
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
        id: uuidv4(),
        bio: null,
        organizationName: 'Bill\'s Theaters',
        phoneNumber: '04321321',
        email: "bill@email.com",
        password: "abc123",
        imgUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }];
  }

  /**
   * Attendees to seed database with
   * @returns Array of Attendees
   */
  getAttendees() {
    return [
      {
        id: uuidv4(),
        firstName: 'Zelda',
        lastName: 'Peach',
        bio: null,
        dob: "2000-12-23",
        email: "zelda@email.com",
        password: "abc123",
        imgUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        firstName: 'Xavier',
        lastName: 'Brown',
        bio: null,
        dob: "2000-6-23",
        email: "xavier@email.com",
        password: "abc123",
        imgUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }];
  }


  /**
   * Events to seed database with
   * @returns Array of Events
   */
  getEvents(organizers) {
    return [
      {
        id: uuidv4(),
        OrganizerId:organizers[0].id,
        title: 'The Publishers',
        venueName: 'Arena 51',
        description: "After the success of their debut album R4inbow Sherbert, The Publishers are touring Australia with their latest record, Golden Fleece.",
        summary: "FREE SHOW IN SYDNEY",
        startDate: "2023-08-08 17:00:00",
        endDate: "023-08-08 19:00:00",
        address: '18 Guilded Street, Leichhardt',
        city: "Sydney",
        region: "NSW",
        postcode: "2040",
        country: "Australia",
        isFree: true,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        OrganizerId:organizers[0].id,
        title: 'Blue Stomp',
        venueName: 'The Hifi',
        description: "Blue Stomp bring the heavy blues guitar licks and lead singer, Chud Grungley's, melancholy voice together in an act that sounds like it's straight out of the Mississippi delta. Supported by Dirtwire",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-09-08 17:30:00",
        endDate: "2023-09-08 20:30:00",
        address: '42 Willoughby Road, Crows Nest',
        city: "Sydney",
        region: "NSW",
        postcode: "2065",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        OrganizerId:organizers[1].id,
        title: 'Bandoliero',
        venueName: 'Jacks Music Shack',
        description: "The Mexican mononym, Bandoliero, brings his rasgueado style music to Sydney for the first time",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-09-08 18:30:00",
        endDate: "2023-09-08 20:30:00",
        address: '18 Victoria Road, Parramatta',
        city: "Sydney",
        region: "NSW",
        postcode: "2000",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        OrganizerId:organizers[1].id,
        title: 'VibeFest 2024',
        venueName: 'The Domain',
        description: "Sydney's largest annual, electronic music fest! Line up to be announced",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2024-02-24 11:00:00",
        endDate: "2024-02-24 23:00:00",
        address: '1 Art Gallery Road',
        city: "Sydney",
        region: "NSW",
        postcode: "2000",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
    ];
  }


  /**
   * Tickets to seed database withgit 
   * @returns Array of Tickets
   */
  getTicketTypes() {
    return [{
      id: uuidv4(),
      name: "General",
      price: 19.99,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }];
  }


  /**
   * Event Ticket Junctions to seed database with
   * @param {*} events 
   * @param {*} tickets 
   * @returns 
   */
  getEventTickets(events, tickets) {
    return [{
      id: uuidv4(),
      TicketTypeId: tickets[0].id,
      EventId: events[1].id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }];
  }


  /**
   * Tags to seed database with
   * @returns Array of Tags
   */
  getTags() {
    return [{
      id: uuidv4(),
      name: "Rock",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      name: "Blues",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      name: "Hip-hop",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      name: "Indie",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      name: "Country",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      name: "Dance",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      name: "Classical",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      name: "Jazz",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      name: "Reggae",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      name: "Electronic",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      name: "Pop",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    ];
  }

  /**
   * Acts to seed database with
   * @returns Array of Acts
   */
  getActs() {
    return [{
      id: uuidv4(),
      name: "The Chop",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }];
  }


  /**
   * Junction for Tags of Events
   * @param {*} events 
   * @param {*} tags 
   * @returns 
   */
  getTaggedWith(events, tags) {
    return [
      {
        id: uuidv4(),
        EventId: events[0].id,
        TagId: tags[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        EventId: events[1].id,
        TagId: tags[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }




  /**
   * Event Image array
   * @returns 
   */
  getEventImgs() {
    return [
      //{
      // createdAt: new Date().toISOString(),
      // updatedAt: new Date().toISOString()
    //}
  ];
  }



  /**
   * Junction for Events and Acts
   * @param {*} events 
   * @param {*} acts 
   * @returns 
   */
  getEventActs(events, acts) {
    return [
      {
        id: uuidv4(),
        EventId: events[0].id,
        ActId: acts[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
      {
        id: uuidv4(),
        EventId: events[1].id,
        ActId: acts[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      },
    ];
  }



  /**
   * Junction for Attendees and Events
   * @param {*} attendees 
   * @param {*} events 
   * @returns 
   */
  getFavouritedBy(attendees, events) {
    return [
      {
        id: uuidv4(),
        AttendeeId: attendees[0].id,
        EventId: events[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
  }







}


//Export SeedData
module.exports = new SeedData();