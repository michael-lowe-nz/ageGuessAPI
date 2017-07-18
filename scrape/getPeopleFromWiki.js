const $ = require('cheerio')
const request = require('superagent')

const getPeopleFromWiki = (url) => {
  return new Promise((resolve, reject) => {
    request.get(url)
      .end((error, response) => {
        const html = $.load(response.text)
        let people = []
        html('.mw-category ul li a').each((index, item) => {
          // if(/**This url is already in the DB**/)
          people.push(`https://en.wikipedia.org${item.attribs.href}`)
        })
        if (!people) return reject('Array is empty')
        resolve(people)
      })
  })
}

module.exports = getPeopleFromWiki
