require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT;

require('./databaseConn.js');

app.use(express.json());
const allRoutes = require('./src/API/controller');

app.use('/api', allRoutes);

app.use((req, res) => {                 // Response you get on the Browser.
    res.status(404).send("Page not found");
});

app.listen(PORT, (err) => {             //Create a listener on the specified port
    console.log("Server running on " + PORT);
});
