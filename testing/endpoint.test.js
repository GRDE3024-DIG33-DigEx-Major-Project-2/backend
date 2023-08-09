// /**
//  * Endpoint unit testing
//  */

// //Import the necessary modules and functions
// const request = require("supertest");
// const { app } = require("../app");
// const superagent = require("superagent");

// /**
//  * Generate a random string
//  * @param {*} length of string to generate
//  * @returns The random string
//  */
// function generateRandomString(length) {
//   const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
//   let result = "";
//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * characters.length);
//     result += characters.charAt(randomIndex);
//   }
//   return result;
// }

// //API endpoint test cases for Organizers
// describe("API endpoint flow for Organizers", () => {
//   let registeredUser; // To store registered user data
//   let eventId;
//   let accessToken; // To store access token

//   //Generate a random email
//   const randomEmail = `test-${generateRandomString(10)}@example.com`;

//   beforeAll(async () => {
//     const requestBody = {
//       email: randomEmail,
//       password: "abc123",
//       userType: "organizer",
//       organizationName: "Test Organization",
//       phoneNumber: "+61 412 345 171",
//     };

//     const response = await request(app)
//       .post("/user/register")
//       .send(requestBody);

//     registeredUser = response.body.user;
//     console.log("SET REGISTERED USER: ", response.body.user);

//     const loginReq = {
//       email: registeredUser.email,
//       password: "abc123",
//     };

//     const loginRes = await request(app).post("/auth/login").send(loginReq);

//     accessToken = loginRes.body.accessToken;
//     console.log("SET ACCESS TOKEN: ", loginRes.body.accessToken);

//     const eventCreateRes = await request(app)
//       .post("/event")
//       .set("Authorization", `Bearer ${accessToken}`)
//       .field("event[title]", "Test Event")
//       .field("event[venueName]", "Venue Name")
//       .field("event[description]", "Description for test event")
//       .field("event[summary]", "Test Event Summary")
//       .field("event[startDate]", "2990-01-08 04:05:06")
//       .field("event[endDate]", "2992-04-04 01:05:01")
//       .field("event[address]", "987 Fake Court, Fake Suburb")
//       .field("event[region]", "NSW")
//       .field("event[city]", "Sydney")
//       .field("event[postcode]", "2000")
//       .field("event[country]", "Australia")
//       .field("event[isFree]", false)
//       .field("acts[0][name]", "Elvis Presley")
//       .field("ticketTypes[0][name]", "General")
//       .field("ticketTypes[0][price]", "10.25");

//     expect(eventCreateRes.status).toBe(201);

//     eventId = eventCreateRes.body.event.id;
//     console.log("SET EVENT ID: ", eventCreateRes.body.event.id);
//   });

//   //Register a user
//   it("should respond with status 201 for POST /user/register", async () => {
//     let testEmail = `test-${generateRandomString(10)}@example.com`;

//     const requestBody = {
//       email: testEmail,
//       password: "abc123",
//       userType: "organizer",
//       organizationName: "Test Organization",
//       phoneNumber: "+61 412 345 171",
//     };

//     const response = await request(app)
//       .post("/user/register")
//       .send(requestBody);

//     expect(response.status).toBe(201);
//   });

//   //Log in with the registered user's credentials
//   it("should respond with status 201 for POST /auth/login", async () => {
//     const requestBody = {
//       email: registeredUser.email,
//       password: "abc123",
//     };

//     const response = await request(app).post("/auth/login").send(requestBody);

//     expect(response.status).toBe(201);
//   });

//   // //Validate the access token
//   // it('should respond with status 200 for GET /auth/validate', async () => {
//   //   const response = await request(app)
//   //     .get('/auth/validate')
//   //     .set('Authorization', `Bearer ${accessToken}`);

//   //   expect(response.status).toBe(200);
//   // });

//   //Create an event
//   it("should respond with status 201 for POST /event", async () => {
//     const eventCreateRes = await request(app)
//       .post("/event")
//       .set("Authorization", `Bearer ${accessToken}`)
//       .field("event[title]", "Test Event")
//       .field("event[venueName]", "Venue Name")
//       .field("event[description]", "Description for test event")
//       .field("event[summary]", "Test Event Summary")
//       .field("event[startDate]", "2990-01-08 04:05:06")
//       .field("event[endDate]", "2992-04-04 01:05:01")
//       .field("event[address]", "987 Fake Court, Fake Suburb")
//       .field("event[region]", "NSW")
//       .field("event[city]", "Sydney")
//       .field("event[postcode]", "2000")
//       .field("event[country]", "Australia")
//       .field("event[isFree]", false)
//       .field("acts[0][name]", "Elvis Presley")
//       .field("ticketTypes[0][name]", "General")
//       .field("ticketTypes[0][price]", "10.25");

//     expect(eventCreateRes.status).toBe(201);
//   });

//   //Get Owned Events
//   it("should respond with status 200 for POST /event/owned-events", async () => {
//     const requestBody = {
//       page: 0,
//     };
//     const response = await request(app)
//       .post("/event/owned-events")
//       .set("Authorization", `Bearer ${accessToken}`)
//       .send(requestBody);

//     expect(response.status).toBe(200);
//   });

//   //Update Event
//   it("should respond with status 200 for PUT /event", async () => {
//     const mockEventData = {
//       event: {
//         "event[id]": `${eventId}`,
//         title: "UPDATE",
//         venueName: "UPDATE",
//         description: "UPDATE",
//       },
//       acts: [],
//       ticketTypes: [],
//       tags: [],
//     };

//     const response = await request(app)
//       .put("/event")
//       .set("Authorization", `Bearer ${accessToken}`)
//       .send(mockEventData);

//     expect(response.status).toBe(200);
//   });

//   //Get Event by ID
//   it("should respond with status 200 for GET /event", async () => {
//     const response = await request(app)
//       .get(`/event/${eventId}`)
//       .set("Authorization", `Bearer ${accessToken}`);

//     expect(response.status).toBe(200);
//   });

//   //Delete Event by ID
//   it("should respond with status 200 for DELETE /event", async () => {
//     const response = await request(app)
//       .delete(`/event/${eventId}`)
//       .set("Authorization", `Bearer ${accessToken}`);

//     expect(response.status).toBe(200);
//   });

//   //Update User
//   it("should respond with status 200 for PUT /user", async () => {
//     const mockFormData = {
//       "user[organizationName]": "UPDATE",
//     };
//     const response = await request(app)
//       .put("/user")
//       .set("Authorization", `Bearer ${accessToken}`)
//       .send(mockFormData);

//     expect(response.status).toBe(200);
//   });

//   //Reset password
//   it("should respond with status 200 for PUT /user/reset-password", async () => {
//     const requestBody = {
//       oldPassword: "abc123",
//       newPassword: "UPDATE",
//     };

//     const response = await request(app)
//       .put("/user")
//       .set("Authorization", `Bearer ${accessToken}`)
//       .send(requestBody);

//     expect(response.status).toBe(200);
//   });

//   //Delete User by ID
//   it("should respond with status 200 for DELETE /user", async () => {
//     const response = await request(app)
//       .delete(`/user`)
//       .set("Authorization", `Bearer ${accessToken}`);

//     expect(response.status).toBe(200);
//   });

//   //Get All Tags
//   it("should respond with status 200 for GET /event/tags", async () => {
//     const response = await request(app).get("/event/tags");

//     expect(response.status).toBe(200);
//   });
// });

// // //API endpoint test cases for Attendees
// // describe('API endpoint flow for Attendees', () => {

// //     //Register Attendee
// //     //Login Attendee
// //     //Validate

// //     //Search Events
// //     //Is Favourited?
// //     //Toggle Favourited
// //     //Get Favourited Events
// //     //Get Event by ID
// //     //Toggle Favourited
// //     //Get Favourited Events
// //     //Get All Tags

// //     //Update User
// //     //Reset Password
// //     //Delete User

// //     //Refresh test?

// //   it('should respond with status 200 for GET /api/events', async () => {
// //     const response = await request(app).get('/api/events');
// //     expect(response.status).toBe(200);
// //   });

// //   it('should respond with status 201 for POST /api/events', async () => {
// //     const mockFormData = {
// //         field1: 'value1',
// //         field2: 'value2',
// //         file: {
// //           buffer: Buffer.from('sample file content'), // Replace with your file content
// //           size: 1000, // Replace with the file size
// //           mimetype: 'image/jpeg', // Replace with the correct file mimetype
// //           originalname: 'example.jpg', // Replace with the original file name
// //         },
// //       };
// //     const response = await request(app).post('/api/events').send(requestBody);
// //     expect(response.status).toBe(200);
// //   });

// //   //Add more test cases for other API endpoints as needed
// // });
