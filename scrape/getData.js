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
        if(error) return reject('Error Retrieving Page (superagent)')
        const html = $.load(response.text)
        if (!pageExists(html)) return reject(`404: Page for ${url} not found.`)
        if (!pageHasImage(html)) return reject(`404: Page for ${url} has no image.`)
        if (!pageHasAge(html)) return reject(`Page for ${url} has no age`)
        resolve(constructData(html, url))
      })
  })
}

const getDataFromName = (name) => getDataFromUrl(getWikiUrl(name))

const constructData = (html, wikiUrl) => {
  const ageRaw = html('.ForceAgeToShow').text()
  return {
    fullName: html('#firstHeading').text(),
    age: getAgeFromString(ageRaw),
    imgUrl: formatImgUrl(html('.infobox .image img').attr('src')),
    wikiUrl
  }
}

const pageExists = (html) => html('body').find('#noarticletext').length ? false : true
const pageHasImage = (html) => html('body').find('.infobox .image img').length ? true : false
const pageHasAge = (html) => html('body').find('.ForceAgeToShow').length ? true : false

module.exports = {
  getDataFromUrl,
  getDataFromName
}
