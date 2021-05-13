const router = require("express").Router();
const Jimp = require("jimp");
const multer = require("multer");
const fs = require("fs");
const app = require("../app");
const { RandomGenerator } = require("./middlewares");
const { write } = require("jimp");

let template = "./image-processing/assets/major-template.jpg";
let hand = "./image-processing/assets/hands/one.jpg";
let imgExport = "./image-processing/exports/export.jpg";


const upload = multer();
router.post("/", RandomGenerator(), upload.single("file"), (req, res, next) => {
  console.log(res.locals.hi,res.locals.randomSuits,res.locals.randomHand);
  Jimp.read(template).then((card) => {
    Jimp.read(req.file.buffer)
      .then((pic) => {
        return pic
          .cover(
            450,
            450,
            Jimp.HORIZONTAL_ALIGN_CENTER,
            Jimp.VERTICAL_ALIGN_MIDDLE
          )
          .quality(100)
          .greyscale();
      })
      .then((pic) => {
        return card
          .composite(pic, 147, 200, [Jimp.BLEND_DESTINATION_OVER])
          .write(`./image-processing/exports/${req.file.originalname}`);
      })
      // .then(() => {
      //   res.status(200).json(req.file);
      // })
  })
  .catch((err) => {
    console.log(err);
  });
});

module.exports = router;
