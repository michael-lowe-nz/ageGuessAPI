var express = require('express');
var router = express.Router();

const passport  = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy

passport.use(new FacebookStrategy({
    clientID: 'fsddf',
    clientSecret: 'FACEBOOK_APP_SECRET',
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

module.exports = router;
