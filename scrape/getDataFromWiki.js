const $ = require('cheerio')
const request = require('superagent')
const { addEntry, deleteEntry } = require('../db/entries')
const getAgeFromString = require('./lib/ageFromStr')
const formatUrl = require('./lib/formatUrl')

const scrapeUrl = (url) => {
  // has to return a Promise
  // e.g. reutrn new Promise((resolve, reject) => { do stuff})
  request
    .get(url)
    .end((err, res) => {
      if (err) return console.log(err)
      const html = $.load(res.text)
      const fullName = html('#firstHeading').text()
      const ageRaw = html('.ForceAgeToShow').text()
      const age = getAgeFromString(ageRaw)
      const url = formatUrl(html('.infobox .image img').attr('src'))
      const data = {
        fullName,
        age,
        url
      }
      console.log(data)
    })
}

const scrapeByName = (name) => {
  scrapeUrl(`https://en.wikipedia.org/wiki/${name}`)
}

scrapeByName('Lebron_James')

module.exports = {
  scrapeUrl
}

// Dream Code:
//
// getDataFromWiki('Lebron James')
//   .then(data => validateData(data))
//   .then(validatedData => addEntry(validatedData))
//   .then(response => res.send('success'))
//   .catch(err => res.send('error'))
