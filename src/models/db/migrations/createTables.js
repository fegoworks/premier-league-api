const {
  Pool
} = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.TEST_URL,
});

pool.on('connect', () => {
  console.log('connected to the db');
});

const createTables = () => {
  const table = `
  DROP TABLE IF EXISTS users CASCADE;
  
  CREATE TABLE IF NOT EXISTS users( 
    userid VARCHAR (50) PRIMARY KEY, 
    firstname VARCHAR (50) NOT null, 
    lastname VARCHAR (50) NOT null, 
    email VARCHAR (60) UNIQUE NOT NULL,
    password VARCHAR (255) NOT NULL, 
    "isAdmin" BOOLEAN DEFAULT FALSE
    );

  DROP TABLE IF EXISTS teams CASCADE;

  CREATE TABLE IF NOT EXISTS teams( 
    "teamId" VARCHAR (50) PRIMARY KEY, 
    "teamName" VARCHAR (50) UNIQUE NOT NULL, 
    "createdBy" VARCHAR (50) NOT NULL REFERENCES users (userid),
    "createdOn" Timestamp DEFAULT CURRENT_TIMESTAMP
    );
  
    `;

  pool
    .query(table)
    .then(res => {
      console.log(res);
      pool.end();
    })
    .catch(err => {
      console.log(err);
      pool.end();
    });
};

createTables();