var express = require('express');
var router = express.Router();

const {
  getEntry,
  getAllEntries,
  addEntry,
  deleteEntry
} = require('./../db/entries')
const {
  getDataFromUrl,
  getDataFromName
} = require('./../scrape/getData')
const getPeopleFromWiki = require('./../scrape/getPeopleFromWiki')

/* GET entries */
router.get('/people/:letter', function(req, res) {
  getPeopleFromWiki(`https://en.wikipedia.org/wiki/Category:Living_people?from=${req.params.letter}`)
  .then(urls => {
    urls.forEach(url => {
      getDataFromUrl(url)
      .then(data => addEntry(data))
      .then(response => console.log(response, "added"))
      .catch(error => console.log(error))
    })
  })
  .then(() => res.send('Wikipedia scraped and entered'))
  .catch(error => {
    res.send('Error!', error)
  })
});

module.exports = router;