var express = require('express');
var router = express.Router();

/* GET entries */
router.get('/', function(req, res) {
  res.render('index', {title: 'ageGuessAPI'})
});

module.exports = router;
