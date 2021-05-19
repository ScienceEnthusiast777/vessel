

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
    res.locals.randomVals = [
      (Math.floor(Math.random()*6)+1),
      (Math.floor(Math.random()*6)+1)
    ]
    res.locals.randomSuits = [
      suits[Math.floor(Math.random() * suits.length)],
      suits[Math.floor(Math.random() * suits.length)],
    ];
    res.locals.randomHand = hands[Math.floor(Math.random() * hands.length)];
    next();
  };
};
const RandomGeneratoLesser = () => {
  return (req, res, next) => {
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
      suits[Math.floor(Math.random() * suits.length)],
      suits[Math.floor(Math.random() * suits.length)],
      suits[Math.floor(Math.random() * suits.length)],
      suits[Math.floor(Math.random() * suits.length)],
      suits[Math.floor(Math.random() * suits.length)],
      suits[Math.floor(Math.random() * suits.length)],
      suits[Math.floor(Math.random() * suits.length)],
    ];
    next();
  };
};

module.exports = { RandomGenerator, RandomGeneratoLesser };
