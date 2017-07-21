var express = require('express');
var router = express.Router();

const {
  getEntry,
  getAllEntries,
  getEntryByUrl,
  addEntry,
  deleteEntry
} = require('./../db/entries')
const wiki  = require('wtf_wikipedia')

/* GET entries */
router.get('/', function(req, res) {
  getAllEntries()
    .then(response => res.json(response))
    .catch(err => res.send(err))
});

/* GET entries by id. */
router.get('/:id', function(req, res) {
  getEntry(req.params.id)
    .then(response => res.json(response))
    .catch(err => res.send(err))
});

/* Entry Exists */
router.post('/exists', function(req, res) {
  console.log("url: ", req.body.url)
  getEntryByUrl(req.body.url)
    .then(response => {
      console.log("response: ", response)
      if (response.length) return res.send(true)
      res.send(false)
    })
    .catch(err => res.send(err))
});

router.post('/', function(req, res) {
  addEntry(req.body)
    .then(response => res.json(response[0]))
    .catch(err => res.send(err))
})

router.get('/:id/delete', function(req, res) {
  deleteEntry(req.params.id)
    .then(response => res.json(response))
    .catch(err => res.send(err))
})

router.post('/wiki', (req, res) => {
  wiki.from_api(req.body.name, "en", function(markup){
    var obj= wiki.parse(markup)
    var mayor= obj.infobox.leader_name
    console.log(obj)
    res.json(obj)
  })
})

module.exports = router;
