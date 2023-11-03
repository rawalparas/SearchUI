require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT;

require('./postgresSQLConnection.js');

app.use(express.json());
const allRoutes = require('./src/api/controller');

/*  cors is a mechanism where the front-end client can make 
requests for resources to an external back-end server. 
*/
const cors = require('cors');
app.use(cors());

app.use('/api', allRoutes); 

app.use((req, res) => {                 
    res.status(404).send("Page not found");
});

app.listen(PORT, (err) => {             
    console.log("Server running on " + PORT);
});
