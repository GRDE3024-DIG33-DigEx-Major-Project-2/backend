# GIGNEY BACKEND
This is the backend REST API for Gigeny


# RESOURCES
Sequelize Docs for ORM:
https://sequelize.org/docs/v6/
Open API Docs for Swagger UI:
https://swagger.io/docs/specification/about/
Sequelize Migrations and Seeding Docs:
https://sequelize.org/docs/v6/other-topics/migrations/

//EXAMPLE
//   Man.hasOne(RightArm);      // ManId in RigthArm
//   RightArm.belongsTo(Man);   // ManId in RigthArm


# FOLDERS
- db
    - Database ORM configurations.
- db/models 
    - Database ORM models. 
- route 
    - Contains files, each responsible for a route path (user, event...). 
    - The endpoints it provides will call middleware, and end with an action method (found in the controller folder).
- controller
    - A controller file will mainly consist of HTTP request action handlers for route endpoints.
- util
    - Utility files are self-explanatory. Try and name them with the subextension .util (enum.util.js as an example).


# FILES
- .env 
    - It holds database connection parameters and the app port number.
- app.js 
    - This is the startup file.
- .sequelizeerc
    - Used by Sequelize CLI in db folder for pointing to certain files


# CURRENT TASKS
1. Get events by filters
2. Sequelize model validation and constraints
3. Endpoint testing and patching
4. A3 Group and Independent report
5. Code comments + cleanup
6. Update JSDocs
7. Finish db CRUD handler abstraction

# BACKLOG
- Better security for secrets/credentials in dev and prod environments
- Next seed data iteration
- Dynamic tag creation
- JWT Refresh Token
- createResult bug in update event handler for act arr and ticketType arr
- Clean up image extension and resize handling
- Rollback transactions through Sequelize
- Fix up comments so they have the correct meaning
- Exclude password hash in db Organizer/Attendee response JSON
- Remove password hash from user access token
- Fix Migrations Down function
- **CONFIGURE AUTHORIZATION HEADER FUNCTIONALITY IN SWAGGER UI**
- **MIGRATIONS FILE**
- **A2/A3 SUBDIRECTORY**




# PREVIOUS TASKS
- ~~Registration endpoint ~~
- ~~Login endpoint~~
- ~~Password encryption/decryption~~
- ~~JWT config~~
- ~~Begin pseudocode (and code) for for endpoints for features~~
- ~~Initial Seed Data~~
- Create event
- Get Event By ID
- Add pre-set tags for now
- Enum helpers for reusability (example being userType field)
- Delete Attendee (cascading deletes)
- Delete Organizer (cascading deletes)
- Delete Event (cascading deletes)
- Profile image add/update/delete
- Event image add/update/delete
- Helper functions
-  Get your favourited/owned events
-  Toggle event favourite
-  Update event
- Delete old image in update endpoints
- Update event image handling + test
- Profile image upload in post and put endpoints
- **AWS ORG INSTEAD?**
- **Confirm if Performer table will be used**
- **Should we have existing act checks, or just create a new act instance every time?**
- **Implement JWT token values in endpoints**
- **TRELLO BOARD DIVYING TASKS?**
- **S3 BUCKET PERMISSIONS**
- **CONFIRM IF EVENTS WILL HAVE MULTIPLE IMAGES**

# OTHER NOTES AND REMINDERS
- Notice the sub extention on some files (test.route.js as an example). I find it makes things a bit more organized and easier to understand.
- Some AWS services (S3 in particular) may not work properly as I may need to add a better way of sharing access.