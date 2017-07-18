const test = require('blue-tape')
const getPeopleFromWiki = require('../scrape/getPeopleFromWiki')

test('can get an array from getPeopleFromWiki with a length greater than 0', t => {
  return getPeopleFromWiki('https://en.wikipedia.org/wiki/Category:Living_people?from=A')
    .then(response => t.ok(response.length))
    .catch(error => t.notOk(error, 'should be no error'))
})
