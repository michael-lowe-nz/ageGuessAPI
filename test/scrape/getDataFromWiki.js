const test = require('blue-tape')
const {
  getDataFromUrl,
  getDataFromName
} = require('../../scrape/getData')
const getPeopleFromWiki = require('../../scrape/getPeopleFromWiki')

// Dream Code:
//
// getDataFromUrl('Lebron James')
//   .then(data => validateData(data))
//   .then(validatedData => addEntry(validatedData))
//   .then(response => res.send('success'))
//   .catch(err => res.send('error'))

// /wiki/Special:RandomInCategory/Living_people
// Should add the original wikipedia page url, shouldn't store in the db if one of that url already exists

test('getDataFromUrl scrapes lebron_james and resolves with correct JSON', t => {
  const expected = {
    fullName: 'LeBron James',
    age: 32,
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/LeBron_James_%2815847318851%29.jpg/220px-LeBron_James_%2815847318851%29.jpg'
  }
  return getDataFromName('lebron_james')
    .then(actual => {
      return t.deepEqual(actual, expected, 'It can retrieve a POJO of Lebron James name, age and url')
    })
})

test('getDataFromUrl throws an error when wiki page does not exist', t => {
  return getDataFromName('https://en.wikipedia.org/a_guy_that_does_not_exist')
    .catch(error => {
      return t.equal(error, '404: Page for a_guy_that_does_not_exist not found.', 'It gets a 404 when a non existent person given')
    })
})

// test('getDataFromName throws an error when wiki page is not a person', t => {
//   return getDataFromName('new_zealand')
//     .then(res => t.equal(res, 'Page is not a person'))
// })

test('getDataFromName throws an error when the wiki page does not have an image', t => {
  return getDataFromName('Aamer_Butt_(cricketer,_born_1976)')
    .then(res => t.notOk(res))
    .catch(error => t.equal(error, 'Page has no image'))
})

test('getDataFromName can operate on a whole array of names and throw no errors', t => {
  const people = ["mariah_carey", "peter_jackson", "stephen_curry", "winston_churchill"]
  const promises = people.map(name => getDataFromName(name))
  return Promise.all(promises)
    .then(res => {
      console.log('Res:', res)
      t.ok(res, 'Normal response from promises')
    })
})

test.only('can get an array from getPeopleFromWiki', t => {
  return getPeopleFromWiki('https://en.wikipedia.org/wiki/Category:Living_people?from=A')
    .then(response => {
      // t.ok(response)
      // return getDataFromUrl(response[35])
      const promises = response.map(url => getDataFromUrl(url))
      return Promise.all(promises)
    })
    .then(response => {

    })
    .catch(error => {
      t.notOk(error, 'something is bad!')
    })
})

test.skip('Can get people and get their data', t => {
  console.log("Getting people and scraping em!!!");
  return getPeopleFromWiki('https://en.wikipedia.org/wiki/Category:Living_people?from=A')
  .then(response => {
    console.log('Response: ', response[15])
    const promises = response.map(url => getDataFromUrl(url))
    return promises[0]
  })
  .then(response => {
    console.log(response)
    t.ok(response, 'scraped data is ok')
  })
  .catch(error => {
    t.notOk(error, 'should be no error, nothing should go wrong')
  })
})
