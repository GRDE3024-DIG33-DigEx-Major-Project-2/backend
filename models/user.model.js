

const { db } = require("../config/db");




//In user.js, require your db, and define a model
var User = db.define('user', {
    firstName: {
      type: Sequelize.STRING
    },
    lastName: {
      type: Sequelize.STRING
    }
  });


  