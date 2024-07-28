const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../middlewares/passport.middleware');
const session = require('express-session');

router.use(session({
    secret: 'secret', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}));

router.use(passport.initialize());
router.use(passport.session());

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/error', (req, res) => res.send('Unknown Error'));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/error' }),
  function(req, res) {
    // Regenerate the session by destroying the current session and saving it
    if (req.session) {
        // Regenerate the session by destroying the current session and saving it
        req.session.regenerate(function(err) {
          if (err) {
            console.error('Error regenerating session:', err);
            return res.redirect('/auth/error');
          }
  
          res.redirect('/');
        });
      } else {
        console.error('req.session is undefined.');
        return res.redirect('/auth/error');
      }
  }
);

router.get('/logout', (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
});

module.exports = router;
