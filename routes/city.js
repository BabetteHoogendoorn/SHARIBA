var express = require('express');
var router = express.Router();

/* GET city page. */
router.get('/', function(req, res) {
  res.render('city', { title: 'Express' });
});


module.exports = router;
