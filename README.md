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
1. Create event
2. Update event 
3. Get events by filters
4. Get your favourited/owned events
5. Code cleanup
6. Code comments
7. Update JSDocs
8. Add pre-set tags for now
9. 
10. 

# BACKLOG
- Enum helpers for reusability (example being userType field)
- Sequelize model validation and constraints
- Helper functions
- Better security for secrets/credentials in dev and prod environments
- Profile image add/update/delete
- Event image add/update/delete
- Delete Attendee (cascading deletes)
- Delete Organizer (cascading deletes)
- Delete Event (cascading deletes)
- Next seed data iteration
- Dynamic tag creation
- JWT Refresh Token
- **Should we have existing act checks, or just create a new act instance every time?**
- **Implement JWT token values in endpoints**
- **CONFIGURE AUTHORIZATION HEADER FUNCTIONALITY IN SWAGGER UI**
- **TRELLO BOARD DIVYING TASKS?**
- **S3 BUCKET PERMISSIONS**
- **AWS ORG INSTEAD?**
- **CONFIRM IF EVENTS WILL HAVE MULTIPLE IMAGES**
- **MIGRATIONS FILE**
- **A2/A3 SUBDIRECTORY**
- **Confirm if Performer table will be used**



# PREVIOUS TASKS
- ~~Registration endpoint ~~
- ~~Login endpoint~~
- ~~Password encryption/decryption~~
- ~~JWT config~~
- ~~Begin pseudocode (and code) for for endpoints for features~~
- ~~Initial Seed Data~~





# OTHER NOTES AND REMINDERS
- Notice the sub extention on some files (test.route.js as an example). I find it makes things a bit more organized and easier to understand.
- Some AWS services (S3 in particular) may not work properly as I may need to add a better way of sharing access.