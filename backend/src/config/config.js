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
    username: "fall2024c8g7",
    password: 'Phamquan2004@',
    database: "fall2024c8g7_club",
    host: "10.96.210.203",
    dialect: "mysql",
    port: 3306

  }
};