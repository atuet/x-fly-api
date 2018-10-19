var express = require('express');
var router = express.Router();
var database = require('../config/database_connection.js');
var vols = require('../scrap/scrap.js');
const token = require('../config/token.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  token.checktoken(req, res, next);
  vols.requestflights();
  const data = require('../scrap/flights.json');
  res.end(JSON.stringify(data, null, 3));
});


module.exports = router;
