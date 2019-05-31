/**
 * Configuration de la BDD
 */

const mysql = require('mysql');

// var database = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'ppe1_aero',
//   charset: 'utf8mb4'
// })

var database = mysql.createConnection({
  host: 'localhost',
  user: 'xfly',
  password: 'passbts',
  database: 'xfly',
  charset: 'utf8mb4'
})

module.exports = database;
