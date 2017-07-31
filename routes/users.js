var express = require('express');
var router = express.Router();

const {
    createUser,
    getUserById
} = require('./../db/users')

router.post('/', function(req, res) {
  createUser(req.body)
    .then(response => res.json(response))
    .catch(err => res.send(err))
});

/* GET user */
router.get('/:userId', function(req, res) {
  getUserById(req.params.userId)
  .then(response => res.json(response))
  .catch(err => res.send(err))
});

module.exports = router;
