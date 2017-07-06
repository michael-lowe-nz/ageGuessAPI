const wiki  = require('wtf_wikipedia')
const $ = require('cheerio')
const request = require('superagent')

// request
//   .get('https://en.wikipedia.org/wiki/George_Clooney')
//   .end((err, res) => {
//     if (err) return console.log(err)
//     const html = $.load(res.text)
//     console.log(wiki.parse(html))
//   })

wiki.from_api("James Blunt", "en", function(markup){
  var obj= wiki.parse(markup)
  var mayor= obj.infobox.leader_name
  console.log(obj.infobox_template)  // "John Tory"
})

wiki.from_api("Lebron James", "en", function(markup){
  var obj= wiki.parse(markup)
  var mayor= obj.infobox.leader_name
  console.log(obj.infobox_template)
  // "John Tory"
})

wiki.from_api("Bill English", "en", function(markup){
  var obj= wiki.parse(markup)
  var mayor= obj.infobox.leader_name
  console.log(obj.infobox_template)
  // "John Tory"
})

wiki.from_api("Battle of Paschaendaele", "en", function(markup){
  var obj= wiki.parse(markup)
  var mayor= obj.infobox.leader_name
  console.log(obj.infobox_template)
  // "John Tory"
})

wiki.from_api("New Zealand", "en", function(markup){
  var obj= wiki.parse(markup)
  var mayor= obj.infobox.leader_name
  console.log(obj.infobox_template)
  // "John Tory"
})

wiki.from_api("Guitar", "en", function(markup){
  var obj= wiki.parse(markup)
  var mayor= obj.infobox.leader_name
  console.log(obj.infobox_template)
  // "John Tory"
})
