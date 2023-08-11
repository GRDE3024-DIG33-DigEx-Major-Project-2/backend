/**
 * Sequelize CLI config options
 */

//Configure .env file suppor
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
  development: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    dialect: process.env.PGDIALECT,
  },
  production: {
    username: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    dialect: process.env.PGDIALECT,
    multipleStatements: process.env.PGMULTISTATEMENTS,
  },
};
