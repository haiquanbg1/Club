require("dotenv").config();
const connection = require('./config/connectDb')
const express = require('express');
const cors = require("cors");

const serverConfig = require("./config/serverConfig");

const app = express();


serverConfig(app);


app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
}));

const api = require("./routes/api");

const port = process.env.PORT || 8080

// test connection
connection()

app.use("/api/v1", api);

app.listen(port, () => console.log('> Server is up and running on port : ' + port))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

