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
  const arrayOfLetters = 'abc'.split('')
  let current = 0
  getPeopleFromWiki(`https://en.wikipedia.org/wiki/Category:Living_people?from=${req.params.letter}`)
    .then(urls => getDataFromArray(urls))
    .then(() => getPeopleFromWiki(`https://en.wikipedia.org/wiki/Category:Living_people?from=${req.params.letter}${arrayOfLetters[0]}`))
    .then(urls => getDataFromArray(urls))
    .then(() => getPeopleFromWiki(`https://en.wikipedia.org/wiki/Category:Living_people?from=${req.params.letter}${arrayOfLetters[1]}`))
    .then(urls => getDataFromArray(urls))
    .then(() => getPeopleFromWiki(`https://en.wikipedia.org/wiki/Category:Living_people?from=${req.params.letter}${arrayOfLetters[2]}`))
    .then(urls => getDataFromArray(urls))
    .then(() => res.redirect('/'))
    .catch(error => res.send('Error!', error))
})

module.exports = router;
