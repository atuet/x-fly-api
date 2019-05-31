var express = require('express');
var router = express.Router();
var database = require('../config/database_connection.js');
const Token = require('../config/token.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
  Token.checktoken(req, res, next);
  database.query('SELECT * FROM membres', function (err, result) {
    if (err) throw err;
    res.end(JSON.stringify(result, null, 3));
  });
});


/* GET users listing. */
router.get('/:id_membre', function (req, res, next) {
  Token.checktoken(req, res, next);
  var idMembre = req.params.id_membre;
  var sql = "SELECT * FROM membres WHERE id_membre = ?";
  database.query(sql, idMembre, function (err, result) {
    if (err) throw err;
    res.end(JSON.stringify(result, null, 3));
  });
});

/* GET users listing. */
router.get('/auth', function (req, res, next) {
  Token.checktoken(req, res, next);
  var id = req.params.id;
  var password = req.params.password;
  database.query(`SELECT id_membre FROM membres WHERE prenom_membre = ${id} AND mot_de_passe = ${password}`, function (err, result) {
    if (err) throw err;
    res.end(JSON.stringify(result, null, 3));
    //res.status(500).end
  });
});

router.get('/vols/:id_membre', function (req, res, next) {
  Token.checktoken(req, res, next);
  var idMembre = req.params.id_membre;
  var sql = `SELECT * FROM vols INNER JOIN affectation ON vols.id_vol = affectation.id_vol WHERE affectation.id_membre = ${idMembre}`;
  database.query(sql, function (err, result) {
    if (err) throw err;
    res.end(JSON.stringify(result, null, 3));
  });
});

module.exports = router;
