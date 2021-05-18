
const express = require("express");

const logger = require("morgan");

const cookieParser = require("cookie-parser");

const cors = require("cors");

const session = require("express-session");
const MongoStore = require("connect-mongo");
const DB_URL = process.env.MONGODB_URI || "mongodb://localhost/vessel";

const User = require("../models/User");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((dbUser) => {
      done(null, dbUser);
    })
    .catch((err) => {
      done(err);
    });
});

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username })
      .then((userFromDB) => {
        if (userFromDB === null) {
          done(null, false, { message: "incorrect login details" });
        } else if (!bcrypt.compareSync(password, userFromDB.password)) {
          done(null, false, { message: "incorrect login details" });
        } else {
          done(null, userFromDB);
        }
      })
      .catch((err) => {
        next(err);
      });
  })
);

module.exports = (app) => {
  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.set("trust proxy", 1);

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      cookie: { maxAge: 1000 * 60 * 60 * 24 },
      saveUninitialized: false,
      resave: true,
      store: MongoStore.create({
        mongoUrl: DB_URL,
      }),
    })
  );

  app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN || "http://localhost:3000",
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
};
