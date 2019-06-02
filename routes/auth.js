var express = require('express');
var router = express.Router();
var database = require('../config/database_connection.js');
const Token = require('../config/token.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
  Token.checktoken(req, res, next);
  var id = req.params.id;
  var password = req.params.password;
  database.query(`SELECT id_membre FROM membres WHERE identifiant_membre = ${id} AND mot_de_passe = ${password}`, function (err, result) {
    if (err) throw err;
    res.end(JSON.stringify(result, null, 3));
    //res.status(500).end
  });
});
