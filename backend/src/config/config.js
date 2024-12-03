require("dotenv").config();

module.exports = {
  development: {
    username: process.env.mysql_user,
    password: process.env.mysql_password,
    database: process.env.mysql_database,
    host: process.env.mysql_host,
    port: process.env.mysql_port,
    dialect: "mysql",
    seederStorage: "json",
    migrationStorage: "json",
    migrationStoragePath: "sequelizeMigrate.json",
    seederStoragePath: "sequelizeSeed.json",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    username: process.env.production_user,
    password: process.env.production_password,
    database: process.env.production_database,
    host: process.env.production_host,
    dialect: "mysql",
  }
};