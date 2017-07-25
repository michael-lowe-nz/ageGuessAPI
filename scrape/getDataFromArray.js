const { addEntry } = require('../db/entries')
const { getDataFromUrl } = require('./getData')
const getPeopleFromWiki = require('./getPeopleFromWiki')

module.exports = (urls) => {
  urls.forEach(url => {
    console.log('Scraping url: ', url);
    getDataFromUrl(url)
      .then(data => addEntry(data))
      .then(response => console.log(response, "added"))
      .catch(error => console.log(error))
  })
}
