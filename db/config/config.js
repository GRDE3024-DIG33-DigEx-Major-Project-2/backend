/**
 * Sequelize CLI config options
 */

//Configure .env file support
let envPath;
switch (process.env.NODE_ENV) {
  case "production":
    envPath = ".env.production";
    break;
  case "development":
  default:
    envPath = ".env.development";
    break;
}
require("dotenv").config({ path: envPath });

module.exports = {
  // development: {
  //   username: process.env.PGUSER,
  //   password: process.env.PGPASSWORD,
  //   database: process.env.PGDATABASE,
  //   host: process.env.PGHOST,
  //   dialect: process.env.PGDIALECT,
  // },
  // production: {
  //   username: process.env.PGUSER,
  //   password: process.env.PGPASSWORD,
  //   database: process.env.PGDATABASE,
  //   host: process.env.PGHOST,
  //   dialect: process.env.PGDIALECT,
  //   multipleStatements: process.env.PGMULTISTATEMENTS,
  // },
    development: {
    username: "postgres",
    password: "localhost",
    database: "postgres",
    host: "127.0.0.1",
    dialect: "postgres",
    multipleStatements: true,
  },
  production: {
    username: "postgres",
    password: "gignet2023$$",
    database: "gigney_a3",
    host: "database-1.cykjmvxaizxv.ap-southeast-2.rds.amazonaws.com",
    dialect: "postgres",
    multipleStatements: true,
  },
};