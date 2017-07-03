const $ = require('cheerio')
const request = require('superagent')

const scrapeUrl = (url) => {
  request
    .get(url)
    .end((err, res) => {
      if (err) return console.log(err)
      const html = $.load(res.text)
      const fullName = html('#firstHeading').text()
      const age = html('.ForceAgeToShow').text()
      const url = html('.infobox .image img').attr('src')
      const data = {
        fullName,
        age,
        url
      }
      console.log(data)
    })
}

const scrapeByName = (name) => {
  return scrapeUrl(`https://en.wikipedia.org/wiki/${name}`)
}

const clooney = 'https://en.wikipedia.org/wiki/George_Clooney'

scrapeByName('Lebron_James')
