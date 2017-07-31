var express = require('express');
var router = express.Router();

const {
  getAllEntries,
} = require('./../db/entries')

/* GET entries */
router.get('/', function(req, res) {
  getAllEntries()
  .then(entries => {
    const shortEntries = entries.slice(0,100)
    res.render('index',
    {
      title: 'ageGuessAPI',
      entries: shortEntries
    })
  })
  .catch(error => console.log(error))
});

router.get('/secret', (req, res) => {
  res.send('michael is coolangatta')
})

module.exports = router;
