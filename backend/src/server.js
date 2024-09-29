require("dotenv").config();
const express = require('express');

const serverConfig = require("./config/serverConfig");

const app = express();

serverConfig(app);

const port = process.env.PORT || 8080

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

