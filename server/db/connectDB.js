const mysql = require("mysql2");
require("dotenv").config();
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DBNAME,
    port: 3306,
    multipleStatements: true,
  });
  
  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("DB Connected!");
  });

module.exports = db