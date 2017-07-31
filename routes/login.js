var express = require('express');
var router = express.Router();
require('dotenv').config()

var passport  = require('passport')
var FacebookStrategy = require('passport-facebook').Strategy

passport.use(new FacebookStrategy({
    clientID: process.env.APP_ID,
    clientSecret: process.env.APP_SECRET,
    callbackURL: "http://localhost:3000/login/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('Response from fb', accessToken, refreshToken, profile)
    done(null, 'michael')
  }
));

/* GET entries */
router.get('/', function(req, res) {
  res.render('login')
});

/* Login Route */
router.get('/auth/facebook', passport.authenticate('facebook'))

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login',
    session: false
  })
)

router.get(
  '/auth/facebook/secret',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.json({'Hello This is A Secret!': 'hi'})
  }
)

module.exports = router;
