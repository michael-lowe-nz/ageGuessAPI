var express = require('express');
var router = express.Router();
require('dotenv').config()

const passport  = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

passport.use(new FacebookStrategy({
    clientID: process.env.APP_ID,
    clientSecret: process.env.APP_SECRET,
    callbackURL: "https://age-guess-api.herokuapp.com"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate(function(err, user) {
      if (err) { return done(err); }
      done(null, user);
    });
  }
));

/* GET entries */
router.get('/', function(req, res) {
  res.render('login')
});

router.get('/auth/facebook', passport.authenticate('facebook'))

router.get('/auth/facebook/callback',
  passport.authenticate('facbeook', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
)

router.get(
  '/auth/facebook/secret',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    res.send('Hello This is A Secret!')
  }
)

module.exports = router;
