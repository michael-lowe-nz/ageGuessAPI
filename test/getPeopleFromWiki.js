const test = require('blue-tape')
const getPeopleFromWiki = require('../scrape/getPeopleFromWiki')

test('can get an array from getPeopleFromWiki with a length greater than 0', t => {
  return getPeopleFromWiki('https://en.wikipedia.org/wiki/Category:Living_people?from=A')
    .then(response => t.ok(response.length))
    .catch(error => t.notOk(error, 'should be no error'))
})

// How should getting people form the 'next' wikis work?
// Do we gather up all the urls and then getPeopleFromWikiOnAllOfThem?

// Ask for people from a certain letter, e.g 'A'
// Iterate through A -> Aa -> Ab -> Ac -> Ad -> Ae ...
// getPeopleFromWiki(...?from=A)
// getPeopleFromWiki(...?from=Ab)
// getData from all the people in the array
// if data is appropriate, store in the DB
