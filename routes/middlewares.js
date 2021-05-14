const { VERTICAL_ALIGN_MIDDLE } = require("jimp");

const router = require("express").Router();

const RandomGenerator = () => {
  return (req, res, next) => {
    const hands = [
      "./image-processing/assets/hands/one.jpg",
      "./image-processing/assets/hands/two.jpg",
      "./image-processing/assets/hands/three.jpg",
    ];
    const suits = [
      "image-processing/assets/suits/bone.jpg",
      "image-processing/assets/suits/brain.jpg",
      "image-processing/assets/suits/candle.jpg",
      "image-processing/assets/suits/heart.jpg",
      "image-processing/assets/suits/scroll.jpg",
    ];
    res.locals.randomSuits = [
      suits[Math.floor(Math.random() * suits.length)],
      suits[Math.floor(Math.random() * suits.length)],
    ];
    res.locals.randomHand = hands[Math.floor(Math.random() * hands.length)];
    res.locals.hi = "howdy";
    next();
  };
};

module.exports = { RandomGenerator };
