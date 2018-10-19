var express = require('express');
var router = express.Router();
var database = require('../config/database_connection.js');
const Token = require('../config/token.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Token.checktoken(req, res, next);
  database.query('SELECT * FROM aeroport', function (err, result) {
    if (err) throw err;
    res.end(JSON.stringify(result, null, 3));
  });
});


/* GET users listing. */
router.get('/:aeroport_aita', function(req, res, next) {
  Token.checktoken(req, res, next);
  var aita = req.params.aeroport_aita;
  var sql = "SELECT * FROM aeroport WHERE code_aita = ?";
  database.query(sql, aita, function (err, result) {
    if (err) throw err;
    res.end(JSON.stringify(result, null, 3));
  });
});

module.exports = router;
