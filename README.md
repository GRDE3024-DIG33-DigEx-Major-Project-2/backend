# GIGNEY BACKEND
Backend REST API for Gigeny


# RESOURCES
Sequelize Docs for ORM:
https://sequelize.org/docs/v6/
Open API Docs for Swagger UI:
https://swagger.io/docs/specification/about/


# FOLDERS
- config 
    - Database ORM configurations.
- models 
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


# NEXT TASKS - RYAN
1. ~~Registration endpoint ~~
2. ~~Login endpoint~~
3. ~~Password encryption/decryption~~
4. ~~JWT config~~
5. Delete account endpoint (not final)
6. Update account endpoint (skeleton code)
7. Test routes for all possible S3 actions
8. More secure AWS/DB credential handling during development
9. More secure AWS/DB credential handling on live site
10. Use dev/prod environment variables
11. Update database tables and fine-tune constraints


# OTHER NOTES AND REMINDERS
- Database name is currently Gignet due to typo. I will change it to Gigney soonish
- Sequelize doesn't support abstract classes easily, so I had to compromise in the models (makes me miss EF Core on C#).
- The class diagram is a little outdated compared to the ORM models as I wasn't aware of the constraints it has.
- Email isUnique will not be enough for validation. During registration, we'll have to 
- I have been a bit sidetracked when it came to getting some endpoints done (login and register namely). Other things took longer to setup than I anticipated.
- Notice the sub extention on some files (test.route.js as an example). I find it makes things a bit more organized and easier to understand.
- Some AWS services (S3 in particular) may not work properly as I may need to add a better way of sharing access.
