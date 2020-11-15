const mysql = require('mysql')
const config = require('../config/db')

const connection = mysql.createConnection(config);
 
connection.connect();

let exc = sql => {
  return new Promise((resolve, reject) => {
    connection.query(sql, function (error, results) {
      if (error) reject(error);
      resolve(results)
    });
  })
}

module.exports = exc