const {
  getDataFromUrl,
  getDataFromName
} = require('../../scrape/getData')
const getPeopleFromWiki = require('../../scrape/getPeopleFromWiki')
const { addEntry } = require('../../db/entries')

getPeopleFromWiki('https://en.wikipedia.org/wiki/Category:Living_people?from=A')
  .then(urls => {
    urls.forEach(url => {
      getDataFromUrl(url)
        .then(data => addEntry(data))
        .catch(error => console.log(error))
    })
  })
  .catch(error => {
    t.notOk(error, 'something is bad!')
  })
