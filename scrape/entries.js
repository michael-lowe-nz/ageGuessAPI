const $ = require('cheerio')
const request = require('superagent')

const scrapeUrl = (url) => {
  request
    .get(url)
    .end((err, res) => {
      if (err) return console.log(err)
      const html = $.load(res.text)
      const fullName = html('#firstHeading').text()
      const ageRaw = html('.ForceAgeToShow').text()
      const age = getAgeFromString(ageRaw)
      const url = formatUrl(html('.infobox .image img').attr('src'))
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

const getAgeFromString = str => Number(str.replace(/\D/g,''))
const formatUrl = url => `https://${url.substring(2)}`

// Dream Code:
// 
// getDataFromWiki('Lebron James')
//   .then(data => validateData(data))
//   .then(validatedData => addEntry(validatedData))
//   .then(response => res.send('success'))
//   .catch(err => res.send('error'))
