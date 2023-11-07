require('dotenv').config();
const express = require('express');
const app = express();

const PORT = process.env.PORT;

const postgresConnection = require('./models');

console.log(postgresConnection);

app.use(express.json());
const allRoutes = require('./src/api/controller');

const cors = require('cors');
app.use(cors());

app.use('/api', allRoutes);

app.use((req, res) => {                 
    res.status(404).send("Page not found");
});

postgresConnection.sequelize.authenticate()
.then(() => {
  console.log('Database connection has been established successfully.');
  app.listen(PORT, (err) => {
    console.log("Server running on " + PORT);
  });
})
.catch((err) => {
  console.error('Unable to connect to the database:', err);
});