const test = require('blue-tape')
const getPeopleFromWiki = require('../../scrape/getPeopleFromWiki')

test('can get an array from getPeopleFromWiki', t => {
  return getPeopleFromWiki('https://en.wikipedia.org/wiki/Category:Living_people?from=A')
    .then(response => {
      t.ok(response)
    })
})
