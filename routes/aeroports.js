var express = require('express');
var router = express.Router();
var database = require('../config/database_connection.js');
const Token = require('../config/token.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
  Token.checktoken(req, res, next);
  database.query('SELECT * FROM airport LIMIT 100', function (err, result) {
    if (err) throw err;
    var data = {};
    var key = 'Aeroports';
    data[key] = result;
    res.end(JSON.stringify(data, null, 3));
  });
});


/* GET users listing. */
router.get('/:aeroport_aita', function (req, res, next) {
  Token.checktoken(req, res, next);
  var aita = req.params.aeroport_aita;
  var sql = "SELECT * FROM airport WHERE arp_iata_code = ?";
  database.query(sql, aita, function (err, result) {
    if (err) throw err;
    var data = {};
    var key = 'Aeroports';
    data[key] = result;
    res.end(JSON.stringify(data, null, 3));
  });
});

module.exports = router;
