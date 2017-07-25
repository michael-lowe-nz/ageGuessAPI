var express = require('express');
var router = express.Router();

const {
  getAllEntries,
} = require('./../db/entries')

/* GET entries */
router.get('/', function(req, res) {
  getAllEntries()
  .then(entries => {
    res.render('index',
    {
      title: 'ageGuessAPI',
      entries: entries
    })
  })
  .catch(error => console.log(error))
});

module.exports = router;
