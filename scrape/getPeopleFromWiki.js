const $ = require('cheerio')
const request = require('superagent')

const getPeopleFromWiki = (url) => {
  return new Promise((resolve, reject) => {
    request.get(url)
      .end((error, response) => {
        const html = $.load(response.text)
        let people = []
        //.load(response.text)
        html('.mw-category ul li a').each((index, item) => {
            people.push(`https://en.wikipedia.org${item.attribs.href}`)
        })
        if (!people) return reject('List Length is Not 200')
        resolve(people)
      })
  })
}

module.exports = getPeopleFromWiki
