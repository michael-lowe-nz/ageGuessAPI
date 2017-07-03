var express = require('express');
var router = express.Router();

const {
  getEntry,
  getAllEntries,
  addEntry,
  deleteEntry
} = require('./../db/entries')

/* GET users listing. */
router.get('/', function(req, res, next) {
  getAllEntries()
    .then(response => res.send(response))
    .catch(err => console.log(err))
});

module.exports = router;
