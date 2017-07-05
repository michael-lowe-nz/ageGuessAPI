const test = require('blue-tape')
const { getDataFromWiki } = require('../../scrape/getDataFromWiki')

test('entries.js scrapes a URL and resolves with JSON', t => {
  return getDataFromWiki('lebron_james')
    .then(res => {
      t.equal(res, 'lebron data', 'It gets lebron data')
    })
})
