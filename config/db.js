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
  require('../models/act.model'),
  require('../models/article.model'),
  require('../models/blog.model'),
  require('../models/event.model'),
  require('../models/event-image.model'),
  require('../models/article-image.model'),
  require('../models/performer.model'),
 ];


//Define models from external files
for (const modelDefiner of modelDefiners)
	modelDefiner(sequelize);


//Config table associations
AdditionalSetup.AddAssociations(sequelize);



//Export the Sequelize instance as db
module.exports = { db: sequelize };