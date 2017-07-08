const $ = require('cheerio')
const request = require('superagent')
const getAgeFromString = require('./lib/ageFromStr')
const formatImgUrl = require('./lib/formatImgUrl')
const getWikiUrl = require('./lib/getWikiUrl')

const getDataFromUrl = (url) => {
  return new Promise((resolve, reject) => {
    request
      .get(url)
      .end((error, response) => {
        const html = $.load(response.text)
        if (!pageExists(html)) return reject(`404: Page for ${url} not found.`)
        if (!pageHasImage(html)) return reject(`404: Page for ${url} has no image.`)
        resolve(constructData(html))
      })
  })
}

const getDataFromName = (name) => {
  return getDataFromUrl(getWikiUrl(name))
}

const pageHasImage = (html) => html('body').find('.infobox .image img').length ? true : false
const pageIsPerson = (html) => html('body').find('.biography').length ? true : false
const pageExists = (html) => html('body').find('#noarticletext').length ? false : true

const constructData = (html) => {
  const ageRaw = html('.ForceAgeToShow').text()
  return {
    fullName: html('#firstHeading').text(),
    age: getAgeFromString(ageRaw),
    url: formatImgUrl(html('.infobox .image img').attr('src'))
  }
}
module.exports = {
  getDataFromUrl,
  getDataFromName
}
