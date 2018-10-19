 var express = require('express');  
 var router = express.Router();
 var token = 'C1RBRmuhHe1HCkKROBXuvFbXFrpG2VZW';


 module.exports = {
   checktoken: function(req, res, next) {
     var tokenurl = req.body.token || req.query.token || req.headers['x-access-token'];
      if (token != tokenurl) {
       return res.end(JSON.stringify({ success: false, message: 'Failed to authenticate token.' }, null, 3));
     }
   }  
 }
