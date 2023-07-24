# Backend Localhost Setup and Deployment Guide

# Summary: 
This is a setup guide on how to run the backend application on your localhost


# Pre-requisites:
- Node.js installed on OS
    - Node.js installation guide: https://www.pluralsight.com/guides/getting-started-with-nodejs
    - Node.js should be setup globally through the OS environment variables
- PostgreSQL installed on OS (Make sure you install pgAdmin4 through this installer as well)
    - Installers: https://www.postgresql.org/download/
- AWS SDK access key and secret key are provided in the backend project folder's .env file.
    - If not, please contact Team X via email ASAP for the AWS credentials if we failed to add them in.
- AWS S3 object in the backend's src/util/s3.util.js constructor should look like the code snippet below:
    - If not, please uncomment the right one, or contact Team X via email ASAP so that we can uncomment the right one

/////////////////////////////////////////////

  constructor() {
    
    //For live deployment
    //this.s3 = new AWS.S3();

    //For Team members and assessors running on localhost
    this.s3 = new AWS.S3({
			region,
			accessKeyId,
			secretAccessKey
    });
  }

/////////////////////////////////////////////


# Steps:
1.  Make sure the pre-requisites specified above are met
2.  Open pgAdmin4
3.  Set your Master Password to "localhost".
4.  On the left toolbar, right-click one of the Server Groups (create one if none exist)
5.  In the right-click options, navigate to Register->Server
6.  Under the "General" tab, set the "Name" to "postgres" (make sure the backend project folder's PGDATABASE .env variable matches this Name)
7.  Under the "Connection" tab:
    -   Set "Host name/address" to "localhost" (make sure the backend project folder's PGHOST .env variable matches your computer's localhost IP address)
    -   Set "Port" to "5432" (make sure the backend project folder's PGPORT .env variable matches this port number)
    -   Set "Maintenance database" to "postgres"
    -   Set "Username" to "postgres" (make sure the backend project folder's PGNAME .env variable matches this Username)
    -   Set "Password" to the same as your Master Password, which should be "localhost" (make sure the backend project folder's PGPASSWORD .env variable matches this Password)
    -   Enable "Save Password?"
8.  Click "Save" and connect to this server through pgAdmin4
9.  Under the Server's Databases dropdown, the "postgres" database should be listed
    -   If not, right-click the database dropdown, navigate to Create->Database, specify the Database name as "postgres", then click "Save"
10. Under the Database's Schema dropdown, the "public" schema should be listed
    -   If not, right click the Schema dropdown, navigate to Create->Schema, specify the Schema name as "public", then click "Save"
11. Once the PostgreSQL database is set up, open a terminal in the backend's root directory
    -   Execute the line "npm install" to install package dependencies
    -   Execute the line "npm run migrate-dev-up" to migrate the code-first models to the localhost "postgres" database "public" schema
    -   Execute the line "npm run seed-dev-up" to seed the localhost "postgres" database tables with data
    -   Execute the line "npm run prod" to begin running the backend on your localhost in production mode



# Notes:
-   In case of AWS SDK credentials issues:
    -   If the AWS SDK runs into issues regarding credentials, it means that the source code doesn't have the AWS access key and secret key in it.
    -   As Github doesn't allow AWS credentials to be in repositories (and it is something you should never do), we intended to add temporary credentials into the source code for the A2/A3 submissions.
    -   As the live deployment uses AWS-managed credentials, and the localhost deployments use the VSCODE AWS Toolkit for authentication, we have to manually add them in so that it works for assessors.
    -   Please contact Team X via email ASAP for the AWS credentials if we failed to add them in.
-   Additional scripts you may need during assessing:
    -   Execute the line "npm run dev" for the Nodemon-enabled application or if you run into any issues with the script for production
    -   Execute the line "npm run migrate-dev-down" to drop all tables in the database along with table data
    -   Execute the line "npm run seed-dev-down" to drop all table data without dropping tables



# GIGNEY BACKEND
This is the backend REST API for Gigeny

# LIVE URLS
A2: https://a2.gigney.ryanriddiford.com
A3: TBD


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
- Search event start date ordering (THINK ABOUT ENDED EVENTS)
- Finish connecting search event data in frontend
- Phone number field formatting for Organizers
- TaggedWith seed data
- TicketPrice & EventTicket seed data rough version
- Ammend readme guide with db/config/config.json explanation

- Dynamic search with filter change
- Is Free Event?
- Frontend restructure
- Frontend comments and cleanup
- Frontend search events functionality
- Ticket price filter
- Venue filter
- City filter
2. Sequelize model validation and constraints
3. Endpoint testing and patching
4. A3 Group and Independent report
5. Code comments + cleanup
6. Update JSDocs
7. Finish db CRUD handler abstraction
8. BUG - WHEN UPDATING EVENT AND SENDING EXISTING IMAGE THAT YOU DONT WANT CHANGED, THE RESPONSE FOR EVENTIMG IS NULL REGARDLESS OF ADJUSTMENTS
9. Url VIRTUAL field consistency

# BACKLOG
- Finish off backend search event filters
- Get events by filters
- Better security for secrets/credentials in dev and prod environments
- Next seed data iteration
- Dynamic tag creation
- JWT Refresh Token
- Better location filter
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