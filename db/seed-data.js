/**
 * Seed data for use in seeder files
 */

//Import dependencies
const { v4: uuidv4 } = require("uuid");
const AuthUtil = require("../util/auth.util");
const enumUtil = require("../util/enum.util");

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
        id: "b7dab95d-6197-4b67-af74-839f4c6e2f7b",
        bio: null,
        organizationName: "Adam's Venues",
        phoneNumber: "+61 412 345 678",
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
        phoneNumber: "+61 812 680 246",
        email: "bill@email.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      //COUNTRY
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Country Sounds Pty Ltd",
        phoneNumber: "(02) 1234 5678",
        email: "info@countrysounds.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Sydney Country Cares",
        phoneNumber: "(02) 9876 5432",
        email: "contact@sydneycountrycares.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Music Avenue Agency",
        phoneNumber: "(02) 2345 6789",
        email: "contact@musicavenueagency.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Sydney BBQ Bros",
        phoneNumber: "(02) 8765 4321",
        email: "info@sydneybbqbros.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Harmony Events Management",
        phoneNumber: "(02) 3456 7890",
        email: "contact@harmonyevents.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      //JAZZ
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Smooth Sounds Events Pty Ltd",
        phoneNumber: "(02) 5432 1098",
        email: "info@smoothsoundsevents.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Moonlight Events Pty Ltd",
        phoneNumber: "(02) 9876 5432",
        email: "contact@moonlightevents.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Jazz Junction",
        phoneNumber: "(02) 4567 8901",
        email: "info@jazzjunction.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Groove City Productions",
        phoneNumber: "(02) 8765 4321",
        email: "contact@groovecityproductions.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      //ELECTRONIC
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Pulse Productions",
        phoneNumber: "(02) 2345 6789",
        email: "info@pulseproductions.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Neon Events Pty Ltd",
        phoneNumber: "(02) 9876 5432",
        email: "contact@neonevents.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Groove Nation Events",
        phoneNumber: "(02) 3456 7890",
        email: "info@groovenationevents.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Underground Beats Collective",
        phoneNumber: "(02) 4567 8901",
        email: "contact@undergroundbeats.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "DreamState Productions",
        phoneNumber: "(02) 8765 4321",
        email: "info@dreamstateproductions.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      //REGGAE
      {
        id: uuidv4(),
        bio: null,
        organizationName: "One Love Events",
        phoneNumber: "(02) 5432 1098",
        email: "contact@oneloveevents.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Rhythm Island Productions",
        phoneNumber: "(02) 9876 5432",
        email: "info@rhythmislandproductions.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Sunset Sounds Pty Ltd",
        phoneNumber: "(02) 4567 8901",
        email: "contact@sunsetsounds.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Positive Vibrations Events",
        phoneNumber: "(02) 8765 4321",
        email: "info@positivevibrations.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Groovy Groove Events",
        phoneNumber: "(02) 2345 6789",
        email: "contact@groovygrooveevents.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      //DANCE
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Beats On Fire Events",
        phoneNumber: "(02) 9876 5432",
        email: "info@beatsonfireevents.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      //METAL
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Heavy Metal Productions",
        phoneNumber: "(02) 3456 7890",
        email: "contact@heavymetalproductions.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Metal Madness Events",
        phoneNumber: "(02) 2345 6789",
        email: "info@metalmadnessevents.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Thunderstrike Events",
        phoneNumber: "(02) 5432 1098",
        email: "contact@thunderstrikeevents.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Raw Metal Events",
        phoneNumber: "(02) 9876 5432",
        email: "info@rawmetalevents.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Midnight Metal Society",
        phoneNumber: "(02) 4567 8901",
        email: "contact@midnightmetalsociety.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      //HIP HOP
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Urban Beats Events",
        phoneNumber: "(02) 8765 4321",
        email: "info@urbanbeatsevents.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Rap Flow Society",
        phoneNumber: "(02) 2345 6789",
        email: "contact@rapflowsociety.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Underground Vibes Productions",
        phoneNumber: "(02) 5432 1098",
        email: "info@undergroundvibes.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      //POP
      {
        id: uuidv4(),
        bio: null,
        organizationName: "PopNation Events",
        phoneNumber: "(02) 9876 5432",
        email: "contact@popnationevents.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "PopScene Productions",
        phoneNumber: "(02) 4567 8901",
        email: "info@popsceneproductions.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Starlight Entertainment",
        phoneNumber: "(02) 2345 6789",
        email: "contact@starlightentertainment.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "New Year Beats Pty Ltd",
        phoneNumber: "(02) 8765 4321",
        email: "info@newyearbeats.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      //SOLO
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Melody Productions",
        phoneNumber: "(02) 3456 7890",
        email: "contact@melodyproductions.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Smooth Sounds Events",
        phoneNumber: "(02) 2345 6789",
        email: "info@smoothsoundevents.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Harmony Productions",
        phoneNumber: "(02) 5432 1098",
        email: "info@harmonyproductions.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Live Lounge Presents",
        phoneNumber: "(02) 9876 5432",
        email: "contact@liveloungepresents.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "SaxSounds Productions",
        phoneNumber: "(02) 4567 8901",
        email: "info@saxsoundsproductions.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      //INSTRUMENTAL
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Sydney Symphony Orchestra",
        phoneNumber: "(02) 2345 6789",
        email: "contact@sydneysymphonyorchestra.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "JazzVibes Productions",
        phoneNumber: "(02) 9876 5432",
        email: "info@jazzvibesproductions.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Guitar Geniuses Events",
        phoneNumber: "(02) 3456 7890",
        email: "contact@guitargeniusesevents.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Melodic Harmony Productions",
        phoneNumber: "(02) 2345 6789",
        email: "info@melodicharmonyproductions.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Avant-Garde Productions",
        phoneNumber: "(02) 5432 1098",
        email: "contact@avantgardeproductions.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      //RAP
      {
        id: uuidv4(),
        bio: null,
        organizationName: "RapNation Events",
        phoneNumber: "(02) 9876 5432",
        email: "info@rapnationevents.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Raw Rhymes Productions",
        phoneNumber: "(02) 2345 6789",
        email: "contact@rawrhymesproductions.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Groovy Beats Events",
        phoneNumber: "(02) 5432 1098",
        email: "info@groovybeatsevents.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Femme Flow Productions",
        phoneNumber: "(02) 8765 4321",
        email: "contact@femmeflowproductions.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Big Beats Entertainment",
        phoneNumber: "(02) 4567 8901",
        email: "info@bigbeatsentertainment.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      //INTERNATIONAL
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Global Beats Productions",
        phoneNumber: "(02) 2345 6789",
        email: "contact@globalbeatsproductions.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Latin Vibes Events",
        phoneNumber: "(02) 9876 5432",
        email: "info@latinvibesevents.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Asia Sound Waves",
        phoneNumber: "(02) 4567 8901",
        email: "contact@asiasoundwaves.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "K-Pop Mania Events",
        phoneNumber: "(02) 5432 1098",
        email: "info@kpopmaniaevents.com",
        password: AuthUtil.generateHash("abc123"),
        imgFilename: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        bio: null,
        organizationName: "Euro Groove Productions",
        phoneNumber: "(02) 8765 4321",
        email: "contact@eurogrooveproductions.com",
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
        id: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
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
   * @returns Object of arrays containing grouped events by genre
   */
  getEvents(organizers) {
    let rockEvents = [
      {
        id: uuidv4(),
        OrganizerId: organizers[0].id,
        title: "The Publishers",
        venueName: "Arena 51",
        description:
          "After the success of their debut album R4inbow Sherbert, The Publishers are touring Australia with their latest record, Golden Fleece.",
        summary: "FREE SHOW IN SYDNEY",
        startDate: "2023-08-08 17:00:00",
        endDate: "2023-08-08 19:00:00",
        address: "18 Guilded Street, Leichhardt",
        city: "Sydney",
        region: "NSW",
        postcode: "2040",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    let countryEvents = [
      // COUNTRY
      {
        id: uuidv4(),
        OrganizerId: organizers[2].id,
        title: "Sydney Country Music Festival",
        venueName: "Sydney Olympic Park",
        description:
          "The Sydney Country Music Festival is a three-day celebration of country music featuring performances by some of the biggest names in the industry. Attendees can enjoy live music, food trucks, and a family-friendly atmosphere.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-08-05 09:00:00",
        endDate: "2023-08-07 22:00:00",
        address: "5 Olympic Boulevard",
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
        OrganizerId: organizers[3].id,
        title: "Boots and Hats Hoedown",
        venueName: "The Roundhouse, UNSW Sydney",
        description:
          "The Boots and Hats Hoedown is a fun-filled evening of country music, line dancing, and western-themed activities. All proceeds from the event go towards supporting local charities and community projects.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-09-16 19:00:00",
        endDate: "2023-09-16 23:00:00",
        address: "International Rd",
        city: "Kensington",
        region: "NSW",
        postcode: "2052",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[4].id,
        title: "Southern Sounds Showcase",
        venueName: "The Vanguard, Newtown",
        description:
          "The Southern Sounds Showcase brings together emerging country music talents from the Southern region. It's a night of soulful melodies and intimate performances in a cozy venue setting.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-10-22 18:00:00",
        endDate: "2023-10-22 22:00:00",
        address: "42 King St",
        city: "Newtown",
        region: "NSW",
        postcode: "2042",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[5].id,
        title: "Country BBQ Cook-Off and Music Fest",
        venueName: "Parramatta Park",
        description:
          "The Country BBQ Cook-Off and Music Fest is a unique blend of country music and mouthwatering BBQ. Enjoy the tunes, savor delicious barbecue, and witness BBQ teams compete for the title of Best BBQ in Sydney.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-11-11 11:00:00",
        endDate: "2023-11-11 20:00:00",
        address: "Pitt St &, Macquarie St",
        city: "Parramatta",
        region: "NSW",
        postcode: "2150",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[6].id,
        title: "Country Christmas Spectacular",
        venueName: "Sydney Opera House",
        description:
          "The Country Christmas Spectacular is a heartwarming holiday concert featuring country music stars performing traditional Christmas favorites and country-infused holiday tunes. It's a festive evening for the whole family to enjoy.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-12-17 18:00:00",
        endDate: "2023-12-17 21:00:00",
        address: "Bennelong Point",
        city: "Sydney",
        region: "NSW",
        postcode: "2000",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    let classicalEvents = [
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
    ];

    let jazzEvents = [
      // JAZZ
      {
        id: uuidv4(),
        OrganizerId: organizers[7].id,
        title: "Sydney Jazz Weekend",
        venueName: "Darling Harbour Jazz Club",
        description:
          "The Sydney Jazz Weekend is a three-day extravaganza of smooth jazz performances by renowned local and international artists. The event offers a relaxed and elegant atmosphere, perfect for jazz enthusiasts and newcomers alike.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2024-04-07 18:00:00",
        endDate: "2024-04-07 20:00:00",
        address: "44 King St",
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
        OrganizerId: organizers[7].id,
        title: "Sydney Jazz Weekend",
        venueName: "Darling Harbour Jazz Club",
        description:
          "The Sydney Jazz Weekend is a three-day extravaganza of smooth jazz performances by renowned local and international artists. The event offers a relaxed and elegant atmosphere, perfect for jazz enthusiasts and newcomers alike.",
        summary: " ",
        startDate: "2024-04-08 18:00:00",
        endDate: "2024-04-08 20:00:00",
        address: "44 King St",
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
        OrganizerId: organizers[7].id,
        title: "Sydney Jazz Weekend",
        venueName: "Darling Harbour Jazz Club",
        description:
          "The Sydney Jazz Weekend is a three-day extravaganza of smooth jazz performances by renowned local and international artists. The event offers a relaxed and elegant atmosphere, perfect for jazz enthusiasts and newcomers alike.",
        summary: " ",
        startDate: "2024-04-09 18:00:00",
        endDate: "2024-04-09 20:00:00",
        address: "44 King St",
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
        OrganizerId: organizers[8].id,
        title: "Jazz Under the Stars",
        venueName: "Sydney Botanic Gardens",
        description:
          "Jazz Under the Stars is a magical evening of jazz music set in the picturesque surroundings of the Sydney Botanic Gardens. The event offers an unforgettable experience of music, nature, and fine dining.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: " 2023-08-25 19:00:00",
        endDate: " 2023-08-25 22:00:00",
        address: "Mrs Macquaries Rd",
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
        OrganizerId: organizers[9].id,
        title: "Swingin' Sundays",
        venueName: "The Basement, Circular Quay",
        description: "The Sydney Swing Cats",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-08-06 09:00:00",
        endDate: "2023-08-27 21:00:00",
        address: "7 Macquarie Pl",
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
        OrganizerId: organizers[10].id,
        title: "Jazz Fusion Fusion",
        venueName: "The Vanguard, Newtown",
        description:
          "Jazz Fusion Fusion is a cutting-edge jazz event that explores the fusion of jazz with various contemporary genres, including funk, rock, and electronic music. Prepare for an evening of experimental sounds and mind-blowing performances.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-09-16 18:00:00",
        endDate: "2023-09-16 20:00:00",
        address: "42 King St",
        city: "Newtown",
        region: "NSW",
        postcode: "2042",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        OrganizerId: organizers[6].id,
        title: "Jazz Legends Tribute",
        venueName: "Sydney Opera House",
        description:
          "The Jazz Legends Tribute is a night dedicated to honoring jazz icons from the past and present. A star-studded lineup of jazz virtuosos will take the stage to pay homage to the legends who shaped the genre.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-11-12 18:00:00",
        endDate: "2023-11-12 20:00:00",
        address: "Bennelong Point",
        city: "Sydney",
        region: "NSW",
        postcode: "2000",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    let electronicEvents = [
      // ELECTRONIC
      {
        id: uuidv4(),
        OrganizerId: organizers[11].id,
        title: "ElectraWave Festival",
        venueName: "Sydney Showgrounds, Olympic Park",
        description:
          "ElectraWave Festival is a two-day celebration of electronic dance music, featuring some of the biggest names in the EDM industry. Prepare for mind-blowing visuals, energetic performances, and an unforgettable dance party experience.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2024-03-18 09:00:00",
        endDate: "2024-03-19 23:00:00",
        address: "1 Showground Road",
        city: "Sydney Olympic Park",
        region: "NSW",
        postcode: "2127",
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

      {
        id: uuidv4(),
        OrganizerId: organizers[12].id,
        title: "Neon Nights Rave",
        venueName: "The Metro Theatre, Sydney CBD",
        description:
          "Neon Nights Rave is an electrifying night of non-stop electronic beats, neon lights, and vibrant party vibes. Get ready to dance until the early hours of the morning amidst an immersive neon wonderland.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2024-06-10 20:00:00",
        endDate: "2024-06-11 02:00:00",
        address: "G2/624 George St",
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
        OrganizerId: organizers[13].id,
        title: "SynthWave Sensations",
        venueName: "The Enmore Theatre, Newtown",
        description:
          "SynthWave Sensations brings together the best of retro synthwave and modern electronic music. Dance to nostalgic tunes and contemporary bangers as the artists create an electrifying atmosphere.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-08-22 18:00:00",
        endDate: "2023-08-22 23:00:00",
        address: "118-132 Enmore Rd",
        city: "Newtown",
        region: "NSW",
        postcode: "2042",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[14].id,
        title: "Techno Evolution",
        venueName: "Warehouse X, Alexandria",
        description:
          "Techno Evolution is a cutting-edge techno music event in a warehouse setting, showcasing the evolution of techno sounds. Expect dark, mesmerizing beats and an immersive audio-visual experience.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-09-09 21:00:00",
        endDate: "2023-09-10 02:00:00",
        address: "15 - 17 William Street",
        city: "Alexandria",
        region: "NSW",
        postcode: "2015",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[15].id,
        title: "Electric Dreams Showcase",
        venueName: "The Ivy, Sydney CBD",
        description:
          "Electric Dreams Showcase is an upscale electronic music event featuring a blend of progressive house, trance, and melodic techno. The stunning venue and carefully curated lineup promise a night of pure musical euphoria.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-11-04 18:00:00",
        endDate: "2023-11-04 23:00:00",
        address: "330 George St",
        city: "Sydney",
        region: "NSW",
        postcode: "2000",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    let reggaeEvents = [
      // REGGAE
      {
        id: uuidv4(),
        OrganizerId: organizers[16].id,
        title: "Reggae Vibes Fest",
        venueName: "Bondi Pavilion, Bondi Beach",
        description:
          "Reggae Vibes Fest is a one-day celebration of reggae music and Caribbean culture. Get ready to experience the laid-back rhythms, vibrant performances, and delicious Caribbean cuisine in the picturesque setting of Bondi Beach.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2024-03-25 10:00:00",
        endDate: "2024-03-25 20:00:00",
        address: "Queen Elizabeth Dr",
        city: "Bondi Beach",
        region: "NSW",
        postcode: "2026",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[17].id,
        title: "Island Jam Session",
        venueName: "The Factory Theatre, Marrickville",
        description:
          "Island Jam Session is a night dedicated to the infectious beats of reggae, dancehall, and ska music. Join the groove as talented local and international artists take the stage for an unforgettable reggae experience.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2024-05-13 18:00:00",
        endDate: "2024-05-13 21:00:00",
        address: "105 Victoria Rd",
        city: "Marrickville",
        region: "NSW",
        postcode: "2204",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[18].id,
        title: "Reggae Sunset Cruise",
        venueName: "Sydney Harbour",
        description:
          "The Reggae Sunset Cruise offers a unique way to enjoy reggae beats with the stunning backdrop of Sydney Harbour at sunset. Dance to the rhythms, feel the sea breeze, and watch the city lights as you sail through the iconic harbor.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-09-08 19:00:00",
        endDate: "2023-09-08 22:00:00",
        address: "Curlew Camp Rd",
        city: "Mosman",
        region: "NSW",
        postcode: "2088",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[19].id,
        title: "Roots Reggae Revival",
        venueName: "The Metro Theatre, Sydney CBD",
        description:
          "Roots Reggae Revival brings together legendary and up-and-coming reggae artists for a night of roots, rocksteady, and conscious reggae music. Immerse yourself in the uplifting and positive vibes of the reggae genre.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-09-16 18:00:00",
        endDate: "2023-09-16 20:00:00",
        address: "G2/624 George St",
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
        OrganizerId: organizers[20].id,
        title: "Reggae Fiesta Fair",
        venueName: "Prince Alfred Park, Surry Hills",
        description: "The Original Wailers",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-11-19 11:00:00",
        endDate: "2023-11-19 20:00:00",
        address: "Chalmers St",
        city: "Surry Hills",
        region: "NSW",
        postcode: "2010",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    let danceEvents = [
      // DANCE
      {
        id: uuidv4(),
        OrganizerId: organizers[21].id,
        title: "Electric Dance Nation",
        venueName: "Sydney Showground, Olympic Park",
        description:
          "Electric Dance Nation is a high-energy dance music extravaganza featuring top DJs and performers from around the world. With stunning visual effects and immersive sound, this event promises an electrifying experience.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2024-02-11 11:00:00",
        endDate: "2024-02-11 23:00:00",
        address: "Grand Parade",
        city: "Sydney Olympic Park",
        region: "NSW",
        postcode: "2127",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[14].id,
        title: "Techno Warehouse Rave",
        venueName: "Secret Warehouse Location, Sydney CBD",
        description:
          "The Techno Warehouse Rave is an underground dance music event, featuring cutting-edge techno and tech-house beats in a secret industrial location. Get ready to dance the night away in an intimate and immersive setting.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2024-04-22 20:00:00",
        endDate: "2024-04-23 02:00:00",
        address: "15 - 17 William Street",
        city: "Alexandria",
        region: "NSW",
        postcode: "2015",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[13].id,
        title: "Tropical Groove Beach Party",
        venueName: "Manly Beach",
        description:
          "The Tropical Groove Beach Party is a day-to-night dance extravaganza set on the sandy shores of Manly Beach. Dance to the best tropical and house beats while enjoying the beach vibes and stunning ocean views.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-10-08 10:00:00",
        endDate: "2023-10-08 20:00:00",
        address: "N Steyne",
        city: "Manly",
        region: "NSW",
        postcode: "2095",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[18].id,
        title: "Summer Dance Escape",
        venueName: "Luna Park, Milsons Point",
        description:
          "Summer Dance Escape is a two-day dance music festival held at the iconic Luna Park. Experience a thrilling combination of electrifying music, carnival rides, and breathtaking harbor views.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-10-14 11:00:00",
        endDate: "2023-10-15 23:00:00",
        address: "1 Olympic Dr",
        city: "Milsons Point",
        region: "NSW",
        postcode: "2061",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[20].id,
        title: "Club Nights: The Ultimate Dance Party",
        venueName: "Ivy Nightclub, Sydney CBD",
        description:
          "Club Nights is the ultimate New Year's Eve dance party, held at one of Sydney's most prestigious nightclubs. Dance into the new year with top DJs, dazzling light displays, and a vibrant atmosphere.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-12-31 20:00:00",
        endDate: "2024-01-01 02:00:00",
        address: "330 George St",
        city: "Sydney",
        region: "NSW",
        postcode: "2000",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    let metalEvents = [
      // METAL
      {
        id: uuidv4(),
        OrganizerId: organizers[22].id,
        title: "Metal Mayhem Fest",
        venueName: "The Enmore Theatre, Newtown",
        description:
          "Metal Mayhem Fest is a night of headbanging and moshing to some of the best metal bands in the scene. Prepare for a high-energy event featuring both local and international metal acts.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2024-04-08 18:00:00",
        endDate: "2024-04-08 23:00:00",
        address: "118-132 Enmore Rd",
        city: "Newtown",
        region: "NSW",
        postcode: "2042",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[23].id,
        title: "Sydney Metal Invasion",
        venueName: "Manning Bar, Camperdown",
        description:
          "Sydney Metal Invasion brings together a diverse lineup of metal subgenres, from thrash to death metal, creating a night of sonic mayhem and intense performances.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2024-06-17 17:30:00",
        endDate: "2024-06-17 22:30:00",
        address: "Manning House, Manning Rd",
        city: "Camperdown",
        region: "NSW",
        postcode: "2050",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[24].id,
        title: "Metal Masters Showcase",
        venueName: "Factory Theatre, Marrickville",
        description:
          "Metal Masters Showcase is a celebration of the best local metal talent in Sydney. Witness the power and diversity of the city's metal scene with this epic showcase event.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-08-26 19:00:00",
        endDate: "2023-08-26 00:00:00",
        address: "105 Victoria Rd",
        city: "Marrickville",
        region: "NSW",
        postcode: "2204",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[25].id,
        title: "Unleashed Fury Fest",
        venueName: "The Bald Faced Stag, Leichhardt",
        description:
          "Unleashed Fury Fest promises a night of raw and aggressive metal performances, with bands that push the boundaries of the genre and deliver unrelenting fury on stage.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-10-14 18:30:00",
        endDate: "2023-10-14 22:30:00",
        address: "345 Parramatta Rd",
        city: "Leichhardt",
        region: "NSW",
        postcode: "2040",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[26].id,
        title: "Metal Masquerade Ball",
        venueName: "The Metro Theatre, Sydney CBD",
        description:
          "Metal Masquerade Ball is a unique metal experience, combining the energy of metal music with the elegance of a masquerade ball. Dress up, headbang, and enjoy a night of metal decadence.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-12-09 20:00:00",
        endDate: "2023-12-10 01:00:00",
        address: "G2/624 George St",
        city: "Sydney",
        region: "NSW",
        postcode: "2000",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    let hiphopEvents = [
      // HIP HOP
      {
        id: uuidv4(),
        OrganizerId: organizers[27].id,
        title: "Hip Hop Extravaganza",
        venueName: "Hordern Pavilion, Moore Park",
        description:
          "Hip Hop Extravaganza is a night of urban music, showcasing the best in hip-hop and R&B. Join the party and experience a fusion of beats, live performances, and dance battles.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2024-03-25 19:00:00",
        endDate: "2024-03-25 00:00:00",
        address: "1 Driver Ave",
        city: "Moore Park",
        region: "NSW",
        postcode: "2021",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[28].id,
        title: "Sydney Rap Cypher Showcase",
        venueName: "The Lair, Metro Theatre, Sydney CBD",
        description:
          "Sydney Rap Cypher Showcase is a platform for local hip-hop artists to shine. Experience the raw talent of the city's rap scene with freestyle cyphers, rap battles, and live performances.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2024-06-10 18:30:00",
        endDate: "2024-06-10 22:30:00",
        address: "G2/624 George St",
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
        OrganizerId: organizers[20].id,
        title: "Hip Hop Block Party",
        venueName: "Carriageworks, Eveleigh",
        description:
          "Hip Hop Block Party is a family-friendly event celebrating hip-hop culture. Enjoy live music, dance performances, street art, and food trucks in a vibrant and inclusive atmosphere.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-08-19 16:00:00",
        endDate: "2023-08-19 22:00:00",
        address: "245 Wilson St",
        city: "Eveleigh",
        region: "NSW",
        postcode: "2015",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[29].id,
        title: "Underground Hip Hop Showdown",
        venueName: "The Basement, Circular Quay",
        description:
          "Underground Hip Hop Showdown is an evening dedicated to showcasing the best underground hip-hop talent. Immerse yourself in the authentic sounds of the local hip-hop scene.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-10-07 20:00:00",
        endDate: "2023-10-08 01:00:00",
        address: "7 Macquarie Pl",
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
        OrganizerId: organizers[21].id,
        title: "Hip Hop All-Stars Jam",
        venueName: "Ivy Nightclub, Sydney CBD",
        description:
          "Hip Hop All-Stars Jam brings together a lineup of legendary hip-hop artists for an unforgettable night of classic hits and iconic performances. Get ready to party with the hip-hop greats.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-12-16 21:00:00",
        endDate: "2023-12-17 03:00:00 ",
        address: "330 George St",
        city: "Sydney",
        region: "NSW",
        postcode: "2000",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    let popEvents = [
      // POP
      {
        id: uuidv4(),
        OrganizerId: organizers[30].id,
        title: "PopMania Festival",
        venueName: "Centennial Parklands, Sydney",
        description:
          "PopMania Festival is a celebration of all things pop music, featuring chart-topping artists and emerging talents. Enjoy a day filled with infectious pop melodies and a lively, family-friendly atmosphere.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2024-03-11 15:00:00",
        endDate: "2024-03-11 22:00:00",
        address: "Oxford Street and Lang Road, Paddington Gates",
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
        OrganizerId: organizers[31].id,
        title: "Sydney Pop Showcase",
        venueName: "The Metro Theatre, Sydney CBD",
        description:
          "Sydney Pop Showcase highlights the best pop acts from around the world, creating a night of electrifying performances and unforgettable pop hits.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2024-05-20 18:30:00",
        endDate: "2024-05-20 23:00:00",
        address: "G2/624 George St",
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
        OrganizerId: organizers[32].id,
        title: "Pop Divas Live!",
        venueName: "The Enmore Theatre, Newtown",
        description:
          "Pop Divas Live! pays tribute to the biggest female pop stars of today and yesterday. Experience a night of powerhouse vocals and iconic performances by the ultimate pop divas.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2024-07-08 19:00:00",
        endDate: "2024-07-08 00:00:00",
        address: "118-132 Enmore Rd",
        city: "Newtown",
        region: "NSW",
        postcode: "2042",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[20].id,
        title: "Neon Pop Party",
        venueName: "Luna Park, Milsons Point",
        description:
          "Neon Pop Party is a vibrant and visually stunning pop music event, featuring top artists and neon-themed décor for a night of dancing and partying.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-09-16 20:00:00",
        endDate: "2023-09-17 02:00:00",
        address: "1 Olympic Dr",
        city: "Milsons Point",
        region: "NSW",
        postcode: "2061",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[33].id,
        title: "New Year's Eve Pop Bash",
        venueName: "Qudos Bank Arena, Sydney Olympic Park",
        description:
          "The New Year's Eve Pop Bash is the ultimate way to ring in the new year, with a star-studded lineup of pop superstars and a spectacular countdown celebration.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-12-31 20:00:00",
        endDate: "2024-01-01 01:00:00",
        address: "19 Edwin Flack Ave",
        city: "Sydney Olympic Park",
        region: "NSW",
        postcode: "2127",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    let soloEvents = [
      // SOLO
      {
        id: uuidv4(),
        OrganizerId: organizers[34].id,
        title: "Soulful Serenade - An Evening with Emma Thompson",
        venueName: "City Recital Hall, Angel Place ",
        description:
          "Soulful Serenade features the captivating voice of Emma Thompson in an intimate solo performance. Experience a night of soulful melodies and heartfelt ballads at the iconic City Recital Hall.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2024-03-18 19:30:00",
        endDate: "2024-03-18 22:00:00",
        address: "2 Angel Pl",
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
        OrganizerId: organizers[35].id,
        title: "Acoustic Vibes - An Evening with James Morrison",
        venueName: "The Basement, Circular Quay",
        description:
          "Acoustic Vibes presents the raw and authentic talent of James Morrison in an unplugged solo performance. Enjoy a night of soulful acoustic tunes in the intimate setting of The Basement.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2024-06-10 20:00:00",
        endDate: "2024-06-10 23:00:00",
        address: "7 Macquarie Pl",
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
        OrganizerId: organizers[36].id,
        title: "Piano Serenity - An Evening with Sarah Walker",
        venueName: "Sydney Opera House, Utzon Room",
        description:
          "Piano Serenity features the artistry of Sarah Walker, enchanting the audience with her mesmerizing piano solos in the intimate Utzon Room of the Sydney Opera House.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-08-26 19:00:00",
        endDate: "2023-08-26 21:30:00",
        address: "Bennelong Point",
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
        OrganizerId: organizers[37].id,
        title: "Guitar Unplugged - An Evening with Alex Turner",
        venueName: "The Vanguard, Newtown",
        description:
          "Guitar Unplugged showcases the incredible guitar skills of Alex Turner in an acoustic solo performance. Get ready for a night of spellbinding guitar arrangements and soulful melodies.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-10-14 18:30:00",
        endDate: "2023-10-14 21:00:00",
        address: "42 King St",
        city: "Newtown",
        region: "NSW",
        postcode: "2042",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[38].id,
        title: "Saxophone Soliloquy - An Evening with Lisa Davis",
        venueName: "The Brass Monkey, Cronulla",
        description:
          "Saxophone Soliloquy presents the soulful and sultry sounds of Lisa Davis on the saxophone. Enjoy a night of smooth jazz and soul classics in the intimate ambiance of The Brass Monkey.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-12-09 20:00:00",
        endDate: "2023-12-09 22:00:00",
        address: "115A Cronulla St",
        city: "Cronulla",
        region: "NSW",
        postcode: "2230",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    let instrumentalEvents = [
      // INSTRUMENTAL
      {
        id: uuidv4(),
        OrganizerId: organizers[39].id,
        title: "Symphony of Strings",
        venueName: "Sydney Opera House, Concert Hall",
        description:
          "Symphony of Strings is an enchanting evening of orchestral music, featuring a repertoire of classical masterpieces and contemporary compositions, all centered around the beauty of strings.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2024-04-15 19:00:00",
        endDate: "2024-04-15 21:30:00",
        address: "Bennelong Point",
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
        OrganizerId: organizers[40].id,
        title: "Jazz Piano Soirée",
        venueName: "Foundry 616, Ultimo",
        description:
          "Jazz Piano Soirée presents an intimate night of exceptional jazz piano performances, featuring renowned pianists and emerging talents showcasing their skills and improvisations.",
        summary: "PAID SHOW IN SYDNEY ",
        startDate: "2024-06-25 18:00:00",
        endDate: "2024-06-25 22:00:00",
        address: "616 Harris St",
        city: "Ultimo",
        region: "NSW",
        postcode: "2007",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[41].id,
        title: "Guitar Masters Showcase",
        venueName: "The Factory Theatre, Marrickville",
        description:
          "Guitar Masters Showcase celebrates the artistry of guitar virtuosos from various genres, creating a night of mind-blowing guitar solos, innovative techniques, and instrumental brilliance.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-08-12 19:00:00",
        endDate: "2023-08-12 23:00:00",
        address: "105 Victoria Rd",
        city: "Marrickville",
        region: "NSW",
        postcode: "2204",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[42].id,
        title: "Flute and Harp Serenade",
        venueName: "Art Gallery of New South Wales, Domain Theatre",
        description:
          "Flute and Harp Serenade presents a captivating blend of flute and harp performances in the serene setting of the Art Gallery of New South Wales' Domain Theatre.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-10-21 17:00:00",
        endDate: "2023-10-21 19:00:00",
        address: "Art Gallery Rd",
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
        OrganizerId: organizers[43].id,
        title: "Experimental Soundscape Showcase",
        venueName: "The Red Rattler Theatre, Marrickville",
        description:
          "Experimental Soundscape Showcase explores the world of experimental and ambient music, featuring avant-garde artists who push the boundaries of traditional soundscapes.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-12-03 20:00:00",
        endDate: "2023-12-03 23:00:00",
        address: "6 Faversham St",
        city: "Marrickville",
        region: "NSW",
        postcode: "2204",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    let rapEvents = [
      // RAP
      {
        id: uuidv4(),
        OrganizerId: organizers[44].id,
        title: "Sydney Rap Fest",
        venueName: "Hordern Pavilion, Moore Park",
        description:
          "Sydney Rap Fest is a celebration of hip-hop culture, featuring top rap artists, electrifying performances, and freestyle rap battles that showcase the best talent in the scene.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2024-03-04 18:00:00",
        endDate: "2024-03-04 23:00:00",
        address: "1 Driver Ave",
        city: "Moore Park",
        region: "NSW",
        postcode: "2021",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[45].id,
        title: "Rap Cypher Showdown",
        venueName: "Carriageworks, Eveleigh",
        description:
          "Rap Cypher Showdown is a night of intense rap battles and freestyle competitions, where the city's most skilled lyricists go head-to-head in a battle for supremacy.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2024-05-13 19:00:00",
        endDate: "2024-05-13 22:30:00",
        address: "245 Wilson St",
        city: "Eveleigh",
        region: "NSW",
        postcode: "2015",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[46].id,
        title: "Urban Groove Night",
        venueName: "The Enmore Theatre, Newtown",
        description:
          "Urban Groove Night is a vibrant party featuring the best in urban music, from hip-hop to R&B. Dance the night away to the hottest beats from top urban artists.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2024-07-22 20:00:00",
        endDate: "2024-07-23 01:00:00",
        address: "118-132 Enmore Rd",
        city: "Newtown",
        region: "NSW",
        postcode: "2042",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[47].id,
        title: "Women in Rap Showcase",
        venueName: "The Factory Theatre, Marrickville",
        description:
          "Women in Rap Showcase shines a spotlight on the talented female rappers in the industry, featuring empowering performances and celebrating the contributions of women to hip-hop.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-09-09 19:30:00",
        endDate: "2023-09-09 23:00:00",
        address: "105 Victoria Rd",
        city: "Marrickville",
        region: "NSW",
        postcode: "2204",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[48].id,
        title: "Rap City Jam",
        venueName: "Qudos Bank Arena, Sydney Olympic Park",
        description:
          "Rap City Jam brings together the biggest names in rap music for an epic night of hits and high-energy performances, closing the year with an unforgettable rap celebration.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-12-16 18:00:00",
        endDate: "2023-12-16 23:00:00",
        address: "19 Edwin Flack Ave",
        city: "Sydney Olympic Park",
        region: "NSW",
        postcode: "2127",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    let internationalEvents = [
      // INTERNATIONAL
      {
        id: uuidv4(),
        OrganizerId: organizers[49].id,
        title: "World Music Fest",
        venueName: "ICC Sydney, Darling Harbour",
        description:
          "World Music Fest celebrates the diversity of music from around the globe, featuring artists from different countries and cultures. Experience a vibrant fusion of sounds and rhythms.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2024-04-29 14:00:00",
        endDate: "2024-04-29 22:00:00",
        address: "14 Darling Dr",
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
        OrganizerId: organizers[50].id,
        title: "Latin Fiesta Night",
        venueName: "Luna Park, Milsons Point",
        description:
          "Latin Fiesta Night is an electrifying celebration of Latin music and dance, featuring top artists from the Latin music scene. Get ready to move to the infectious rhythms of salsa, bachata, and more.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2024-06-24 18:30:00",
        endDate: "2024-06-24 23:00:00",
        address: "1 Olympic Dr",
        city: "Milsons Point",
        region: "NSW",
        postcode: "2061",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[51].id,
        title: "Asian Beats Showcase",
        venueName: "The Enmore Theatre, Newtown",
        description:
          "Asian Beats Showcase highlights the diversity of music from Asia, featuring a lineup of Asian artists who blend traditional sounds with contemporary beats.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-08-12 19:00:00",
        endDate: "2023-08-12 23:00:00",
        address: "118-132 Enmore Rd",
        city: "Newtown",
        region: "NSW",
        postcode: "2042",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[52].id,
        title: "K-Pop Extravaganza",
        venueName: "Qudos Bank Arena, Sydney Olympic Park",
        description:
          "K-Pop Extravaganza brings the hottest K-Pop acts to the stage for an electrifying night of music, dance, and captivating performances.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-08-05 18:00:00",
        endDate: "2023-08-05 22:30:00",
        address: "19 Edwin Flack Ave",
        city: "Sydney Olympic Park",
        region: "NSW",
        postcode: "2127",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },

      {
        id: uuidv4(),
        OrganizerId: organizers[53].id,
        title: "European Beats Gala",
        venueName: "The Factory Theatre, Marrickville",
        description:
          "European Beats Gala showcases the best of European music, featuring a diverse lineup of artists from various European countries, representing a wide range of genres.",
        summary: "PAID SHOW IN SYDNEY",
        startDate: "2023-12-09 19:30:00",
        endDate: "2023-12-09 23:00:00",
        address: "105 Victoria Rd",
        city: "Marrickville",
        region: "NSW",
        postcode: "2204",
        country: "Australia",
        isFree: false,
        purchaseUrl: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];

    let bluesEvents = [
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
    ];

    let events = {
      rockEvents: rockEvents,
      countryEvents: countryEvents,
      jazzEvents: jazzEvents,
      electronicEvents: electronicEvents,
      reggaeEvents: reggaeEvents,
      danceEvents: danceEvents,
      metalEvents: metalEvents,
      hiphopEvents: hiphopEvents,
      popEvents: popEvents,
      soloEvents: soloEvents,
      instrumentalEvents: instrumentalEvents,
      rapEvents: rapEvents,
      internationalEvents: internationalEvents,
      bluesEvents: bluesEvents,
      classicalEvents: classicalEvents,
    };

    return events;
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
        EventId: events.rockEvents[0].id,
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
        name: enumUtil.genres.rock,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: enumUtil.genres.blues,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: enumUtil.genres.hiphop,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: enumUtil.genres.indie,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: enumUtil.genres.country,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: enumUtil.genres.dance,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: enumUtil.genres.classical,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: enumUtil.genres.jazz,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: enumUtil.genres.reggae,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: enumUtil.genres.electronic,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: enumUtil.genres.pop,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: enumUtil.genres.metal,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: enumUtil.genres.solo,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: enumUtil.genres.instrumental,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: enumUtil.genres.rap,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        name: enumUtil.genres.international,
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
   * Builds tag-event junction rows for a specific tag
   * @param {*} events
   * @param {*} tag
   * @returns Array of Event-Tag junction rows
   */
  buildTagJunctions(events, tag) {
    let arr = [];
    //Append new junction for each event with the tag specified
    for (let ev of events) {
      arr.push({
        id: uuidv4(),
        EventId: ev.id,
        TagId: tag.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    //Return junctions of that tag
    return arr;
  }

  /**
   * Junction for Tags of Events
   * @param {*} events
   * @param {*} tags
   * @returns Array of Event-Tag junction rows
   */
  getTaggedWith(events, tags) {
    //Object of arrays containing grouped junctions by tag
    let tagJunctions = {
      rockEvents: this.buildTagJunctions(
        events.rockEvents,
        tags.find((x) => x.name === enumUtil.genres.rock),
      ),
      countryEvents: this.buildTagJunctions(
        events.countryEvents,
        tags.find((x) => x.name === enumUtil.genres.country),
      ),
      jazzEvents: this.buildTagJunctions(
        events.jazzEvents,
        tags.find((x) => x.name === enumUtil.genres.jazz),
      ),
      electronicEvents: this.buildTagJunctions(
        events.electronicEvents,
        tags.find((x) => x.name === enumUtil.genres.electronic),
      ),
      reggaeEvents: this.buildTagJunctions(
        events.reggaeEvents,
        tags.find((x) => x.name === enumUtil.genres.reggae),
      ),
      danceEvents: this.buildTagJunctions(
        events.danceEvents,
        tags.find((x) => x.name === enumUtil.genres.dance),
      ),
      metalEvents: this.buildTagJunctions(
        events.metalEvents,
        tags.find((x) => x.name === enumUtil.genres.metal),
      ),
      hiphopEvents: this.buildTagJunctions(
        events.hiphopEvents,
        tags.find((x) => x.name === enumUtil.genres.hiphop),
      ),
      popEvents: this.buildTagJunctions(
        events.popEvents,
        tags.find((x) => x.name === enumUtil.genres.pop),
      ),
      soloEvents: this.buildTagJunctions(
        events.soloEvents,
        tags.find((x) => x.name === enumUtil.genres.solo),
      ),
      instrumentalEvents: this.buildTagJunctions(
        events.instrumentalEvents,
        tags.find((x) => x.name === enumUtil.genres.instrumental),
      ),
      rapEvents: this.buildTagJunctions(
        events.rapEvents,
        tags.find((x) => x.name === enumUtil.genres.rap),
      ),
      internationalEvents: this.buildTagJunctions(
        events.internationalEvents,
        tags.find((x) => x.name === enumUtil.genres.international),
      ),
      bluesEvents: this.buildTagJunctions(
        events.bluesEvents,
        tags.find((x) => x.name === enumUtil.genres.blues),
      ),
      classicalEvents: this.buildTagJunctions(
        events.classicalEvents,
        tags.find((x) => x.name === enumUtil.genres.classical),
      ),
    };

    //Flatten into one array, then return it
    return Object.values(tagJunctions).flat();
  }

  /**
   * Builds Event images by genre
   * @param {*} events
   * @param {*} filename Filename of event image
   * @returns Array of Event Images
   */
  buildEventImages(events, filename) {
    //Subdirectory on s3 bucket to seed data event images
    let SUB_DIRECTORY = "seed-event-images/";
    //Array containing event image objects
    let arr = [];
    //Append new junction for each event with the tag specified
    for (let ev of events) {
      arr.push({
        id: uuidv4(),
        EventId: ev.id,
        filename: SUB_DIRECTORY + filename,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
    //Return junctions of that tag
    return arr;
  }

  /**
   * Event Image array
   * @returns Array of Event Image rows
   */
  getEventImgs(events) {
    let concertCrowdStr = "ConcertCrowd";
    let imgCount = 1;

    //Object of arrays containing grouped junctions by tag
    let eventImgs = {
      rockEvents: this.buildEventImages(
        events.rockEvents,
        concertCrowdStr + imgCount++,
      ),
      countryEvents: this.buildEventImages(
        events.countryEvents,
        concertCrowdStr + imgCount++,
      ),
      jazzEvents: this.buildEventImages(
        events.jazzEvents,
        concertCrowdStr + imgCount++,
      ),
      electronicEvents: this.buildEventImages(
        events.electronicEvents,
        concertCrowdStr + imgCount++,
      ),
      reggaeEvents: this.buildEventImages(
        events.reggaeEvents,
        concertCrowdStr + imgCount++,
      ),
      danceEvents: this.buildEventImages(
        events.danceEvents,
        concertCrowdStr + imgCount++,
      ),
      metalEvents: this.buildEventImages(
        events.metalEvents,
        concertCrowdStr + imgCount++,
      ),
      hiphopEvents: this.buildEventImages(
        events.hiphopEvents,
        concertCrowdStr + imgCount++,
      ),
      popEvents: this.buildEventImages(
        events.popEvents,
        concertCrowdStr + imgCount++,
      ),
      soloEvents: this.buildEventImages(
        events.soloEvents,
        concertCrowdStr + imgCount--,
      ),
      instrumentalEvents: this.buildEventImages(
        events.instrumentalEvents,
        concertCrowdStr + imgCount--,
      ),
      rapEvents: this.buildEventImages(
        events.rapEvents,
        concertCrowdStr + imgCount--,
      ),
      internationalEvents: this.buildEventImages(
        events.internationalEvents,
        concertCrowdStr + imgCount--,
      ),
      bluesEvents: this.buildEventImages(
        events.bluesEvents,
        concertCrowdStr + imgCount--,
      ),
      classicalEvents: this.buildEventImages(
        events.classicalEvents,
        concertCrowdStr + imgCount--,
      ),
    };

    return Object.values(eventImgs).flat();
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
        EventId: events.rockEvents[0].id,
        ActId: acts[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: uuidv4(),
        EventId: events.metalEvents[0].id,
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
        EventId: events.rockEvents[0].id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ];
  }
}

//Export SeedData
module.exports = new SeedData();
