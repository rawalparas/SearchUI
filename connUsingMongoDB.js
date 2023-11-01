const mongoose = require("mongoose");
const URL = process.env.URL;  

mongoose.connect(URL, { useNewUrlParser: true });
const db = mongoose.connection;

db.once("open", (_) => {                // This function create an event listener for an open event and this is executed only once
  console.log("Database connected:", URL);
});
db.on("error", (err) => {               //  This set up the event listener if any error occurs in the connection
  console.error("connection error:", err);
});