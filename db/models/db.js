/**
 * Database connection and table setup.
 * Exports Sequelize client for handling db operations.
 */

//Import dependencies
require("dotenv").config();
const { Sequelize } = require("sequelize");
const AdditionalSetup = require("../config/additional-setup");

//Instantiate database connection through Sequelize instance
const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: "postgres",
    logging: false,
    define: {
      //prevent sequelize from pluralizing table names
      freezeTableName: true,
    },
  },
);

//Array of model definers
const modelDefiners = [
  require("./user/organizer.model"),
  require("./user/attendee.model"),
  require("./event/act.model"),
  require("./event/event.model"),
  require("./event/event-image.model"),
  require("./event/ticket-type.model"),
  require("./event/tag.model"),
  require("./junctions/event-act.model"),
  require("./junctions/event-ticket.model"),
  require("./junctions/favourited-by.model"),
  require("./junctions/tagged-with.model"),
];

//Define models from external files
for (const modelDefiner of modelDefiners) modelDefiner(sequelize);

//Config table associations
AdditionalSetup.AddAssociations(sequelize);

//Config model hooks
AdditionalSetup.AddHooks(sequelize);

//Export the Sequelize instance as db
module.exports = { db: sequelize };
