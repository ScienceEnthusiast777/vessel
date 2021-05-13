const router = require("express").Router();

const test = () => {
  return (req, res, next) => {
    res.locals.hi = "howdy";
    next();
  };
};

module.exports = { test };
