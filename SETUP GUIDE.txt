Backend Localhost Setup and Deployment Guide (Final Version)

Summary: 
This is a setup guide on how to run the backend application on your localhost.
It contains instructions predominantly about:
-   Setting up AWS configuration through AWS CLI
-   Localhost database configuration
-   Backend local deployment


Pre-requisites:
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



Steps:
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



Notes:
-   In case of AWS SDK credentials issues:
    -   If the AWS SDK runs into issues regarding credentials, it means that the source code doesn't have the AWS access key and secret key in it.
    -   As Github doesn't allow AWS credentials to be in repositories (and it is something you should never do), we intended to add temporary credentials into the source code for the A2/A3 submissions.
    -   As the live deployment uses AWS-managed credentials, and the localhost deployments use the VSCODE AWS Toolkit for authentication, we have to manually add them in so that it works for assessors.
    -   Please contact Team X via email ASAP for the AWS credentials if we failed to add them in.
-   Additional scripts you may need during assessing:
    -   Execute the line "npm run dev" for the Nodemon-enabled application or if you run into any issues with the script for production
    -   Execute the line "npm run migrate-dev-down" to drop all tables in the database along with table data
    -   Execute the line "npm run seed-dev-down" to drop all table data without dropping tables