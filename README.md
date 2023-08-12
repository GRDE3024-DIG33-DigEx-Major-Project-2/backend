# GIGNEY BACKEND
This is the backend REST API for Gigney


# Backend Localhost Setup and Deployment Guide (Final Version)

# Summary: 
This is a setup guide on how to run the backend application on your localhost.
It contains instructions predominantly about:
-   Setting up AWS configuration through AWS CLI
-   Localhost database configuration
-   Backend local deployment


# Pre-requisites:
- Node.js installed on OS
    - Node.js installation guide: https://www.pluralsight.com/guides/getting-started-with-nodejs
    - Node.js should be setup globally through the OS environment variables
- PostgreSQL installed on OS (Make sure you install pgAdmin4 through this installer as well)
    - Installers: https://www.postgresql.org/download/
- AWS CLI installed on OS
    - Installers: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
- AWS SDK access key and secret key are provided in the backend project folder's "AWS CREDENTIALS.txt" file
    - If not, please contact Team X via email ASAP for the AWS credentials if we failed to add them in.
    - If the credentials are lack policies for AWS S3 features, contact Team X via email ASAP so we can resolve the permissions issues
        - Policy issues can occur if we accidentally upload the credentials to Github, which AWS then adds restrictive policies to the exposed credentials.



# Steps:
1.  Make sure the pre-requisites specified above are met
2.  Open pgAdmin4
3.  Set your Master Password to "localhost".
4.  On the left toolbar, right-click one of the Server Groups (create one if none exist)
5.  In the right-click options, navigate to Register->Server
6.  Under the "General" tab, set the "Name" to "postgres" 
    -   Make sure the backend project folder's PGDATABASE .env variable matches this "Name"
    -   Make sure the json object "development"'s "database" field in the backend file src/db/config/config.json matches this "Name"
7.  Under the "Connection" tab:
    -   Set "Host name/address" to "localhost" 
        -   Make sure the backend project folder's PGHOST .env variable matches your computer's localhost IP address
        -   Make sure the json object "development"'s "host" field in the backend file src/db/config/config.json is set to "localhost" or your computer's localhost IP address
    -   Set "Port" to "5432" 
        -   Make sure the backend project folder's PGPORT .env variable matches this port number
    -   Set "Maintenance database" to "postgres"
    -   Set "Username" to "postgres" 
        -   Make sure the backend project folder's PGNAME .env variable matches this "Username"
        -   Make sure the json object "development"'s "username" field in the backend file src/db/config/config.json is set to this "Username"
    -   Set "Password" to the same as your Master Password, which should be "localhost" 
        -   Make sure the backend project folder's PGPASSWORD .env variable matches this "Password"
        -   Make sure the json object "development"'s "password" field in the backend file src/db/config/config.json is set to this "Password"
    -   Enable "Save Password?"
8.  Click "Save" and connect to this server through pgAdmin4
9.  Under the Server's Databases dropdown, the "postgres" database should be listed
    -   If not, right-click the database dropdown, navigate to Create->Database, specify the Database name as "postgres", then click "Save"
10. Under the Database's Schema dropdown, the "public" schema should be listed
    -   If not, right click the Schema dropdown, navigate to Create->Schema, specify the Schema name as "public", then click "Save"
11. Open a terminal in the backend's root directory
    -   Execute the line "aws configure" and follow the prompts
        -   Input the "AWS Access Key ID" found in the "AWS CREDENTIALS.txt" file in the backend project folder.
        -   Input the "AWS Secret Access Key" found in the "AWS CREDENTIALS.txt" file in the backend project folder.
        -   Input the "Default region name" found in the "AWS CREDENTIALS.txt" file in the backend project folder.
        -   Leave the "Default output format" as is by inputting the "Enter" key. We have it set to "None"
11. Once the PostgreSQL database is set up and AWS is configured, open a terminal in the backend's root directory
    -   Execute the line "npm install" to install package dependencies
    -   Execute the line "npm run migrate-dev-up" to migrate the code-first models to the localhost "postgres" database "public" schema
    -   Execute the line "npm run seed-dev-up" to seed the localhost "postgres" database tables with data
    -   Execute the line "npm run prod" to begin running the backend on your localhost in production mode



# Localhost Deployment Notes:
-   In case of AWS SDK credentials issues:
    -   If the AWS SDK runs into issues regarding credentials, it means that the source code doesn't have the AWS access key and secret key in it.
    -   As Github doesn't allow AWS credentials to be in repositories (and it is something you should never do), we intended to add temporary credentials into the source code for the A2/A3 submissions.
    -   As the live deployment uses AWS-managed credentials, and the localhost deployments use the VSCODE AWS Toolkit for authentication, we have to manually add them in so that it works for assessors.
    -   Please contact Team X via email ASAP for the AWS credentials if we failed to add them in.
-   Additional scripts you may need during assessing:
    -   Execute the line "npm run dev" for the Nodemon-enabled application or if you run into any issues with the script for production
    -   Execute the line "npm run migrate-dev-down" to drop all tables in the database along with table data
    -   Execute the line "npm run seed-dev-down" to drop all table data without dropping tables



# LIVE URLS
A2: https://a2.gigney.ryanriddiford.com
A3: https://a3.gigney.ryanriddiford.com


# A3 CLIENT URLS
Hosted by Ryan: https://main.d2r6b1gwt7kgsa.amplifyapp.com/
Hosted by Jacopo: TBD

# A2 CLIENT URL
Hosted by Jacopo: https://main.d27kan9z07m8v9.amplifyapp.com/

# RESOURCES
Sequelize Docs for ORM:
https://sequelize.org/docs/v6/
Open API Docs for Swagger UI:
https://swagger.io/docs/specification/about/
Sequelize Migrations and Seeding Docs:
https://sequelize.org/docs/v6/other-topics/migrations/


# FOLDERS -- OUTDATED
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


# FILES -- OUTDATED
- .env 
    - It holds database connection parameters and the app port number.
- app.js 
    - This is the startup file.
- .sequelizeerc
    - Used by Sequelize CLI in db folder for pointing to certain files


# CURRENT TASKS
- GIVE CHRIS THE AWS CREDENTIALS.txt file **IMPORTANT**
- UX bugs and improvements
- Loading and pagination bugs and improvements
    - Pagination bugs and improve their button UI/UX
- A more responsive tag chip view. Maybe I will hardcode UUIDs so you don't have to fetch them and make them load. Alternatively I can add in a loading spinner for them.
- Give assessors Attendee and Organizer credentials in frontend instructions that are accounts we have enough unique events in so they can test the pagination easier? Pagination functionality needs at least 11 events.
- Minor scenario bugs
- More efficient use of isFavourited endpoint
- Update user assistance
- A3 Independent report
- Feature testing and debugging
- Backend comments and cleanup
- Endpoint testing and debugging
- Frontend comments and cleanup
- Search event start date ordering
- .env multiple environments setup
- UX Bug Bounties
- Backend unit testing


# BACKLOG
- Seed user profile images
- Better security for secrets/credentials in dev and prod environments
- Seed Data 
    - TicketPrice & EventTicket seed data rough version
- Dynamic tag creation
- Revamp location filter to use more than just the City field
- Clean up image extension and resize handling
- status validation once implemented
- **Longitute latitude search**
- Search location revamp


# PREVIOUS TASKS
- Create event upload issue
- Searching events
    - Tag filter UI
    - Clear all filters
    - Clear one filter
    - Unique filter UI logic
    - No date select as option

- NEW UPDATED METHOD OF AWS CREDENTIAL SETUP
- Set up A3 api app
- Frontend search events functionality
- Fix frontend venue duplicates in filter
- Endpoint handlers in frontend app
- Revamp validation error messages
- Filename without file and vice versa
- Dynamic search with filter change
- Access Denied on S3 Bucket object delete (this was working prior)
- Make Suburb required, not nullable. Add Suburb seed data
- ticketType generalAdmission flag (for display in event listing summary)
- Finish off backend search event filters
- Endpoint request body validation middleware
- Ticket price filter
- Finish connecting search event data in frontend
- Frontend restructure
- Handling if event is free or paid
- createResult bug in update event handler for act arr and ticketType arr
- JWT Refresh Token
- phoneNumber regex for Organizers
- startDate and endDate of event must be either both valid times
- purchaseUrl must be a url format
- Region can only be NSW (hardset it in db?)
- startDate and endDate of event must be in future  
- TaggedWith seed data
- Update JSDocs and api doc Swagger UI
- DB
    - Sequelize model validation and constraints
    - Finish db CRUD handler abstractions
- Make all validation error-handling done by the validate method in the base.validator.js file
- Seed event images
- Rollback transactions through Sequelize
- Seed data second iteration
- Exclude password hash in db Organizer/Attendee response JSON
- Remove password hash from user access token
- Fix Migrations Down function
- Venue filter
- City filter
- BUG - WHEN UPDATING EVENT AND SENDING EXISTING IMAGE THAT YOU DONT WANT CHANGED, THE RESPONSE FOR EVENTIMG IS NULL REGARDLESS OF ADJUSTMENTS
- Registration endpoint
- Login endpoint
- Password encryption/decryption
- JWT setup
- Begin pseudocode (and skeleton code) for endpoints
- Initial Seed Data
- Create event
- Get Event By ID
- Pre-set tags
- Enum helpers for reusability (example being userType field)
- Delete Attendee
- Delete Organizer
- Delete Event
- Profile image add/update/delete
- Event image add/update/delete
- Get your favourited/owned events
- Toggle event favourite
- Update event
- Delete old image in update endpoints
- Update event image handling
- Profile image upload in post and put endpoints
- Implement JWT token values in endpoints
- S3 BUCKET PERMISSIONS