const $ = require('cheerio')
const request = require('superagent')
const getAgeFromString = require('./lib/ageFromStr')
const formatImgUrl = require('./lib/formatImgUrl')
const getWikiUrl = require('./lib/getWikiUrl')

const getDataFromWiki = (name) => {
  return new Promise((resolve, reject) => {
    request
      .get(getWikiUrl(name))
      .end((error, response) => {
        const html = $.load(response.text)
        if (pageDoesNotExist(html)) return reject('404')
        // if (pageIsNotPerson(html)) return reject('Page is not a person')
        if (!pageHasImage(html)) return reject('Page has no image')
        resolve(constructData(html))
      })
  })
}

const pageHasImage = (html) => html('body').find('.infobox .image img').length ? true : false
const pageIsNotPerson = (html) => html('body').find('.biography').length ? false : true
const pageDoesNotExist = (html) => html('body').find('#noarticletext').length ? true : false
const constructData = (html) => {
  const ageRaw = html('.ForceAgeToShow').text()
  return {
    fullName: html('#firstHeading').text(),
    age: getAgeFromString(ageRaw),
    url: formatImgUrl(html('.infobox .image img').attr('src'))
  }
}
module.exports = getDataFromWiki
