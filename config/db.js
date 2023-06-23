





//Import dependencies
require("dotenv").config();
const { Sequelize, Model, DataTypes } = require("sequelize");



//Database connection parameters
const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {  
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: 'postgres',
    logging: false
  });
// with URI
//const sequelize = new Sequelize(process.env.POSTGRESQL_DB_URI);



// in your db.js file, initiate the sequelize instance and connect to your postgres DB
//In user.js, require your db, and define a model
var User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING
  },
  lastName: {
    type: Sequelize.STRING
  }
});
/* require your db in you server.js, and sync it
  *{force: true} option will drop the table if it already exists and recreate it. 
*/
sequelize.sync({force: true});




// class Dog extends Model {
 
// }



// Dog.init({
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   age: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   }
// }, {
//   sequelize,
//   modelName: 'dog',
//   timestamps: false
// });









const testDbConnection = async () => {
    try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  };



  module.exports = { db: sequelize, testDbConnection };