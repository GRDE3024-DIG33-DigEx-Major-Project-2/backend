/**
 * Database connection and table setup. 
 * Exports Sequelize client for handling db operations.
 */



//Link to Sequelize documentation README
//https://sequelize.org/docs/v6/

    // //Defined models in Sequelize instance
    // const { 
    //     Organizer, 
    //     Attendee,
    //     Act,
    //     Article,
    //     Blog,
    //     Event,
    //     ArticleImage,
    //     EventImage,
    //     Performer, 
    //     TicketType,
    //   } = sequelize.models;



//Import dependencies
require('dotenv').config();
const { Sequelize } = require("sequelize");
const AdditionalSetup = require("./additional-setup");


//Instantiate database connection through Sequelize instance
const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {  
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: 'postgres',
    logging: false
  });


//Array of model definers
const modelDefiners = [
  require('../models/user/organizer.model'),
  require('../models/user/attendee.model'),
  require('../models/event/act.model'),
  require('../models/event/article.model'),
  require('../models/event/blog.model'),
  require('../models/event/event.model'),
  require('../models/event/event-image.model'),
  require('../models/event/article-image.model'),
  require('../models/event/performer.model'),
  require('../models/event/ticket-type.model'),
 ];


//Define models from external files
for (const modelDefiner of modelDefiners)
	modelDefiner(sequelize);


//Config table associations
AdditionalSetup.AddAssociations(sequelize);



//Export the Sequelize instance as db
module.exports = { db: sequelize };