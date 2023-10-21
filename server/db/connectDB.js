const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin",
    database: "qr_scanner",
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