const test = require('blue-tape')
const getDataFromWiki = require('../../scrape/getDataFromWiki')

// Dream Code:
//
// getDataFromWiki('Lebron James')
//   .then(data => validateData(data))
//   .then(validatedData => addEntry(validatedData))
//   .then(response => res.send('success'))
//   .catch(err => res.send('error'))

// /wiki/Special:RandomInCategory/Living_people
// Should add the original wikipedia page url, shouldn't store in the db if one of that url already exists

test('getDataFromWiki scrapes lebron_james and resolves with correct JSON', t => {
  const expected = {
    fullName: 'LeBron James',
    age: 32,
    url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/LeBron_James_%2815847318851%29.jpg/220px-LeBron_James_%2815847318851%29.jpg'
  }
  return getDataFromWiki('lebron_james')
    .then(actual => {
      return t.deepEqual(actual, expected, 'It can retrieve a POJO of Lebron James name, age and url')
    })
})

test('getDataFromWiki throws an error when wiki page does not exist', t => {
  return getDataFromWiki('a_guy_that_does_not_exist')
    .catch(error => {
      return t.equal(error, '404', 'It gets a 404 when a non existent person given')
    })
})

// test('getDataFromWiki throws an error when wiki page is not a person', t => {
//   return getDataFromWiki('new_zealand')
//     .then(res => t.equal(res, 'Page is not a person'))
// })

test('getDataFromWiki throws an error when the wiki page does not have an image', t => {
  return getDataFromWiki('Aamer_Butt_(cricketer,_born_1976)')
    .then(res => t.notOk(res))
    .catch(error => t.equal(error, 'Page has no image'))
})
