var express = require('express')
var router = express.Router()

const Knex = require('knex')
const knexConfig = require('../knexfile')[process.env.NODE_ENV || 'development']
const knex = Knex(knexConfig)

/* GET home page. */
router.get('/api', function(req, res, next) {
  knex.select('id', 'fullName', 'age', 'url').from('entries')
  .then(data => {
    res.send(data)
  })
})

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})




module.exports = router
