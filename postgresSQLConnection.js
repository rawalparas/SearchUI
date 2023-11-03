require('dotenv').config()
const pg = require('pg');  // Client is a interface of pg 

const client = new pg.Client({
  user: 'postgres',
  host: 'localhost',  
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: 5432,
});

client.connect()
  .then(() => {
    console.log('Connected to Database :',process.env.DATABASE);
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL:', err);
  });

