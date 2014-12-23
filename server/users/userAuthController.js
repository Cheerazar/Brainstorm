'use strict';

var User = require('../db.js').User;
var passport = require('passport');
var session = require('express-session');

module.exports = function(app) {
  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());


  passport.serializeUser(function(user, done) {
    done(null, user.username);
  });

  passport.deserializeUser(function(username, done) {
    User.findOne({username: username}, function(err, user) {
      if (user) {
        done(null, user);
      } else {
        done(err, false);
      }
    });
  });


  app.get('/auth', passport.authenticate('github'));
  app.get('/auth/callback',
    passport.authenticate('github', { successRedirect: '/', failureRedirect: '/' }));


  var GitHubStrategy = require('passport-github').Strategy;
  passport.use(new GitHubStrategy({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.AUTH_CALLBACK
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({username: profile.username}, function(err, user) {
        if(err) {
          console.log(err);
        }

        if (!user) {
          user = new User({ username: profile.username, socialData: profile._json });
          user.save();
        }
        done(null, user);
      });
    }
  ));
};
