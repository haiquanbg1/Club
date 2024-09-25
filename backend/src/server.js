require("dotenv").config();
const express = require('express');
const cors = require("cors");

const app = express();

require("./config/serverConfig")(app);

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
}));

const api = require("./routes/api");

const port = process.env.PORT || 8080

app.use("/api/v1", api);

app.listen(port, () => console.log('> Server is up and running on port : ' + port))