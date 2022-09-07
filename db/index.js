const mysql = require('mysql2');

async function connectionDB() {
    // get the client
    // create the pool
    const pool = mysql.createPool({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    });
    // now get a Promise wrapped instance of that pool
    const promisePool = pool.promise();
  
    return promisePool;
  }
  
  module.exports = connectionDB;