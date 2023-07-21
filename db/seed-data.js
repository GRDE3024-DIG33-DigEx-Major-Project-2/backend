/**
 * Seed data for use in seeder files
 */

//Import dependencies
const { v4: uuidv4 } = require("uuid");
const AuthUtil = require("../util/auth.util");

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
        organizationName: "Adam's Venues",
        phoneNumber: "04123123",
        email: "adam@email.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Bill's Theaters",
        phoneNumber: "04321321",
        email: "bill@email.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  /**
   * Attendees to seed database with
   * @returns Array of Attendees
   */
  getAttendees() {
    return [
      {
        id: uuidv4(),
        firstName: "Zelda",
        lastName: "Peach",
        bio: null,
        dob: "2000-12-23",
        email: "zelda@email.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        firstName: "Xavier",
        lastName: "Brown",
        bio: null,
        dob: "2000-6-23",
        email: "xavier@email.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        firstName: "Sarah",
        lastName: "Johnson",
        bio: "I'm a music enthusiast and a passionate traveler from Melbourne. With an eclectic taste in music, I enjoy attending a wide range of music events, from rock concerts and indie festivals to classical performances and world music showcases. I love discovering new artists and immersing myself in different music cultures. I am always on the lookout for unique and intimate live performances that leave a lasting impact.",
        dob: "2000-6-23",
        email: "sarah@email.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        firstName: "Alex",
        lastName: "Ramirez",
        bio: "I am a dedicated fan of electronic dance music (EDM) based in Sydney. I am a regular at major music festivals and club nights, always seeking the latest beats and euphoric drops. From techno and house to trance and bass music, my energy on the dance floor is infectious. I am also an aspiring DJ and spend hours perfecting my mixing skills, with dreams of someday performing at some of the biggest EDM events in the world.",
        dob: "2000-6-23",
        email: "alex@email.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        firstName: "Michael",
        lastName: "Chen",
        bio: "I am a classical music enthusiast and a violinist from Brisbane. I have a deep appreciation for orchestral music and chamber performances. Attending concerts and recitals is a way for me to connect with my passion and find inspiration for my own musical journey. I am also interested in exploring contemporary classical compositions and have a keen interest in attending music events that blend classical with other genres.",
        dob: "2000-6-23",
        email: "michael@email.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        firstName: "Jessica",
        lastName: "Williams",
        bio: "I am a country music lover residing in Adelaide. From heartfelt ballads to foot-tapping country-rock tunes, I adore the storytelling and authenticity that country music brings. I enjoy attending country music festivals and intimate acoustic sessions, where I can experience the soulful performances of my favorite artists up close. I am also a talented singer-songwriter, often performing covers and originals at local open mic nights.",
        dob: "2000-6-23",
        email: "jessica@email.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        firstName: "Daniel",
        lastName: "Lee",
        bio: "I am a die-hard fan of hip-hop and rap music from Sydney. I live and breathe the culture, following the latest releases and music news of my favorite hip-hop artists. I attend rap battles, underground cyphers, and major hip-hop concerts, immersing myself in the raw energy and lyricism of the genre. I am always on the lookout for exclusive events and hidden gems in the local hip-hop scene.",
        dob: "2000-6-23",
        email: "daniel@email.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        firstName: "Jason",
        lastName: "Kim",
        bio: "I am a K-Pop enthusiast in the greater Sydney area. I am a dedicated fan of popular K-Pop groups and follow the latest trends in the Korean music industry. I am always eager to attend K-Pop concerts and fan meetings, seeking opportunities to connect with my favorite idols and fellow K-Pop fans.",
        dob: "2000-6-23",
        email: "jason@email.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        firstName: "Kahlee",
        lastName: "Miller",
        bio: "I am a passionate metalhead residing in Sydney. With a love for heavy riffs and powerful vocals, I am always on the lookout for upcoming metal concerts and festivals. I enjoy headbanging to my favorite bands and meeting fellow metal enthusiasts to share the adrenaline-filled experience.",
        dob: "2000-6-23",
        email: "kahlee@email.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  /**
   * Events to seed database with
   * @returns Array of Events
   */
  getEvents(organizers) {
    return [
      {
        id: uuidv4(),
        OrganizerId: organizers[0].id,
        title: "The Publishers",
        venueName: "Arena 51",
        description:
          "After the success of their debut album R4inbow Sherbert, The Publishers are touring Australia with their latest record, Golden Fleece.",
        summary: "FREE SHOW IN SYDNEY",
        startDate: "2023-08-08 17:00:00",
        endDate: "023-08-08 19:00:00",
        address: "18 Guilded Street, Leichhardt",
        city: "Sydney",
        region: "NSW",
        postcode: "2040",
        country: "Australia",
        isFree: true,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        OrganizerId: organizers[0].id,
        title: "Blue Stomp",
        venueName: "The Hifi",
        description:
          "Blue Stomp bring the heavy blues guitar licks and lead singer, Chud Grungley's, melancholy voice together in an act that sounds like it's straight out of the Mississippi delta. Supported by Dirtwire",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-09-08 17:30:00",
        endDate: "2023-09-08 20:30:00",
        address: "42 Willoughby Road, Crows Nest",
        city: "Sydney",
        region: "NSW",
        postcode: "2065",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        OrganizerId: organizers[1].id,
        title: "Bandoliero",
        venueName: "Jacks Music Shack",
        description:
          "The Mexican mononym, Bandoliero, brings his rasgueado style music to Sydney for the first time",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-09-08 18:30:00",
        endDate: "2023-09-08 20:30:00",
        address: "18 Victoria Road, Parramatta",
        city: "Sydney",
        region: "NSW",
        postcode: "2000",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        OrganizerId: organizers[1].id,
        title: "VibeFest 2024",
        venueName: "The Domain",
        description:
          "Sydney's largest annual, electronic music fest! Line up to be announced",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2024-02-24 11:00:00",
        endDate: "2024-02-24 23:00:00",
        address: "1 Art Gallery Road",
        city: "Sydney",
        region: "NSW",
        postcode: "2000",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      // {
      //   id: uuidv4(),
      //   OrganizerId: organizers[1].id,
      //   title: "Sydney Country Music Festival",
      //   venueName: "Sydney Olympic Park",
      //   description:
      //     "Sydney's largest annual, electronic music fest! Line up to be announced",
      //   summary: "PAID SHOW IN SYDNEY",
      //   startDate: "2024-02-24 11:00:00",
      //   endDate: "2024-02-24 23:00:00",
      //   address: "1 Art Gallery Road",
      //   city: "Sydney",
      //   region: "NSW",
      //   postcode: "2000",
      //   country: "Australia",
      //   isFree: false,
      //   purchaseUrl: null,
      //   createdAt: new Date().toISOString(),
      //   updatedAt: new Date().toISOString(),
      // },
    ];
  }

  /**
   * Tickets to seed database withgit
   * @returns Array of Tickets
   */
  getTicketTypes() {
    return [
      {
        id: uuidv4(),
        name: "General",
        price: 19.99,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  /**
   * Event Ticket Junctions to seed database with
   * @param {*} events
   * @param {*} tickets
   * @returns
   */
  getEventTickets(events, tickets) {
    return [
      {
        id: uuidv4(),
        TicketTypeId: tickets[0].id,
        EventId: events[1].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  /**
   * Tags to seed database with
   * @returns Array of Tags
   */
  getTags() {
    return [
      {
        id: uuidv4(),
        name: "Rock",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: "Blues",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: "Hip-hop",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: "Indie",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: "Country",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: "Dance",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: "Classical",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: "Jazz",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: "Reggae",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: "Electronic",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: "Pop",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }

  /**
   * Acts to seed database with
   * @returns Array of Acts
   */
  getActs() {
    return [
      {
        id: uuidv4(),
        name: "The Chop",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
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
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        EventId: events[1].id,
        TagId: tags[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
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
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        EventId: events[1].id,
        ActId: acts[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
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
        updatedAt: new Date().toISOString(),
      },
    ];
  }
}

//Export SeedData
module.exports = new SeedData();
