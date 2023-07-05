/**
 * Seed data for use in seeder files
 */


//Import dependencies
const { v4: uuidv4 } = require('uuid');


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
      id: uuidv4(),
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
getEvents() {
return [
    {
      id: uuidv4(),
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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: uuidv4(),
      title: 'Big Show 2',
      venueName: 'Arena 52',
      description: "Big Show description! PAID ENTRY",
      summary: "PAID SHOW IN SYDNEY",
      startDate: "1998-01-08",
      endDate: "1998-01-08",
      address: '124 Fake Street, Fake Suburb',
      city: "Sydney",
      region: "NSW",
      postcode: "2000",
      country: "Australia",
      isFree: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];


}


/**
 * Tickets to seed database with
 * @returns Array of Tickets
 */
getTickets() {
    return [{
        id: uuidv4(),
        eventId: events[1].id,
        name: "General",
        price: 19.99,
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
      }];
}



getActs() {
return [{
    id: uuidv4(),
    name: "The Chop",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }];
}


getPerformers() {
    return [{
        id: uuidv4(),
        firstName: 'Adam',
        lastName: 'McDowell',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }];
}



getActPerformers() {
    return [{
        ActId: acts[0].id,
        PerformerId: performers[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }];
}


getTaggedWith() {
    return [
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
}



getEventImgs() {
    return [{
        // createdAt: new Date().toISOString(),
        // updatedAt: new Date().toISOString()
      }];
}



getEventActs() {
    return [
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
}



getFavouritedBy() {
    return [
        {
        AttendeeId: attendees[0].id,
        EventId:events[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    ];
}







}




//Export SeedData
module.exports = new SeedData();