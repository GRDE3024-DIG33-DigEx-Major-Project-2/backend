'use strict';

const fs = require("fs");
const path = require("path");;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {


    console.log("Beginning migrations");

    queryInterface.createSchema("public");

    
    queryInterface.createTable("Attendee", {
      name:
    });




    //queryInterface.sequelize.query("DROP SCHEMA public CASCADE;CREATE SCHEMA public;");


    let migrationScript = fs.readFileSync('set_db.sql', 'utf8').split(";\n");

    console.log("Importing dump file...");

    queryInterface.sequelize.query("");
  },

  async down (queryInterface, Sequelize) {
    queryInterface.sequelize.query("DROP SCHEMA public CASCADE;CREATE SCHEMA public;");
  }
};
