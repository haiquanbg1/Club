require("dotenv").config();

const express = require("express");
const cors = require("cors");

const serverConfig = require("./config/serverConfig");

const app = express();
const port = process.env.server_port || 8080;

serverConfig(app);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})