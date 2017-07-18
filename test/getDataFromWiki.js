const test = require('blue-tape')
const {
  getDataFromUrl,
  getDataFromName
} = require('../scrape/getData')
const getPeopleFromWiki = require('../scrape/getPeopleFromWiki')

test('getDataFromUrl scrapes lebron_james and resolves with correct JSON', t => {
  const expected = {
    fullName: 'LeBron James',
    age: 32,
    imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/LeBron_James_%2815847318851%29.jpg/220px-LeBron_James_%2815847318851%29.jpg',
    wikiUrl: `https://en.wikipedia.org/wiki/lebron_james`
  }
  return getDataFromName('lebron_james')
    .then(actual => t.deepEqual(actual, expected, 'It can retrieve a POJO of Lebron James name, age and url'))
    .catch(error => t.notOk(error))
})

test('getDataFromUrl throws an error when wiki page does not exist', t => {
  const url = 'https://en.wikipedia.org/wiki/a_guy_that_does_not_exist'
  // const url = 'https://en.wikipedia.org/wiki/George_Clooney'
  return getDataFromUrl(url)
    .catch(error => {
      return t.equal(error, `404: Page for ${url} not found.`, 'It gets a 404 when a non existent person given')
    })
})

test('getDataFromUrl does not throw an error when wiki page does exist', t => {
  const url = 'https://en.wikipedia.org/wiki/George_Clooney'
  return getDataFromUrl(url)
    .then(res => t.ok(res))
})

test('getDataFromName throws an error when the wiki page does not have an image', t => {
  return getDataFromName('Aamer_Butt_(cricketer,_born_1976)')
    .then(res => t.notOk(res))
    .catch(error => t.ok(error))
})

test('getDataFromName does not throw an error when the wiki page has an image', t => {
  return getDataFromName('George_Clooney')
    .then(res => t.ok(res))
    .catch(error => t.notOk(error))
})

test('getDataFromName can operate on a whole array of names and throw no errors', t => {
  const people = ["mariah_carey", "peter_jackson", "stephen_curry", "winston_churchill"]
  const promises = people.map(name => getDataFromName(name))
  return Promise.all(promises)
    .then(res => t.ok(res, 'Normal response from promises'))
})
