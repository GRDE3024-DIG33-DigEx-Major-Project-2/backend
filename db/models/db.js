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
    //     Event,
    //     EventImage,
    //     Performer, 
    //     TicketType,
    //     Tag,
    //   } = sequelize.models;



//Import dependencies
require('dotenv').config();
const { Sequelize } = require("sequelize");
const AdditionalSetup = require("../config/additional-setup");


//Instantiate database connection through Sequelize instance
const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {  
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: 'postgres',
    logging: false
  });


//Array of model definers
const modelDefiners = [
  require('./organizer.model'),
  require('./attendee.model'),
  require('./act.model'),
  require('./event.model'),
  require('./event-image.model'),
  require('./performer.model'),
  require('./ticket-type.model'),
  require('./tag.model'),
 ];


//Define models from external files
for (const modelDefiner of modelDefiners)
	modelDefiner(sequelize);


//Config table associations
AdditionalSetup.AddAssociations(sequelize);




//Export the Sequelize instance as db
module.exports = { db: sequelize };