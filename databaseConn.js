// const mongoose = require("mongoose");
// const URL = process.env.URL;  

// mongoose.connect(URL, { useNewUrlParser: true });
// const db = mongoose.connection;

// db.once("open", (_) => {                // This function create an event listener for an open event and this is executed only once
//   console.log("Database connected:", URL);
// });
// db.on("error", (err) => {               //  This set up the event listener if any error occurs in the connection
//   console.error("connection error:", err);
// });


const { Client } = require('pg');

// Create a new client instance with your PostgreSQL connection details
const client = new Client({
  user: '',
  host: '',  
  database: 'your_database_name',
  password: 'your_password',
  port: 5432,  // Change to your PostgreSQL server port
});

// Connect to the PostgreSQL database
client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL');
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL:', err);
  });

