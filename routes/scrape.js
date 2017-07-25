var express = require('express');
var router = express.Router();

/** DB **/
const {
  getEntry,
  getAllEntries,
  addEntry,
  deleteEntry
} = require('./../db/entries')

/** Scraping **/
const {
  getDataFromUrl,
  getDataFromName
} = require('./../scrape/getData')
const getPeopleFromWiki = require('./../scrape/getPeopleFromWiki')
const getDataFromArray = require('./../scrape/getDataFromArray')

/* GET entries */
router.get('/people/:letter', function(req, res) {
  const arrayOfLetters = 'abcdefghijklmnopqrstuvwxyz'.split('')
  arrayOfLetters.push('')
  arrayOfLetters.forEach(letter => {
    getPeopleFromWiki(`https://en.wikipedia.org/wiki/Category:Living_people?from=${req.params.letter}${letter}`)
      .then(urls => getDataFromArray(urls))
      .catch(error => res.send(error, 'Error!'))
  })
})

module.exports = router;
