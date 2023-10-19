require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT;

require('./databaseConn.js');

app.use(express.json());
const allRoutes = require('./src/api/controller');

const cors = require('cors');
const errorHandler = require('./src/api/errorHandling/errorHandling.js');
app.use(cors());

app.use('/api', allRoutes);

app.use(errorHandler);

app.use((req, res) => {                 
    res.status(404).send("Page not found");
});

app.listen(PORT, (err) => {             
    console.log("Server running on " + PORT);
});
