const router = require("express").Router();
const Jimp = require("jimp");
const multer = require("multer");
const fs = require("fs");
const app = require("../app");
const { RandomGenerator } = require("./middlewares");
const { write } = require("jimp");
const Card = require("../models/Card");

let template = "./image-processing/assets/major-template.jpg";
let hand = "./image-processing/assets/hands/one.jpg";
let imgExport = "./image-processing/exports/export.jpg";

router.get("/", (req, res, next) => {
  var selection = [];
  Card.aggregate([{ $sample: { size: 9 } }]).then((sample) => {
    selection = [...sample];
    console.log(selection);
  });
});

const upload = multer();
router.post("/", RandomGenerator(), upload.single("file"), (req, res, next) => {
  const hand = res.locals.randomHand;
  const suitOne = res.locals.randomSuits[0];
  const suitTwo = res.locals.randomSuits[1];
  Jimp.read(template)
    .then((card) => {
      Jimp.read(req.file.buffer)
        .then((pic) => {
          return pic
            .cover(
              450,
              450,
              Jimp.HORIZONTAL_ALIGN_CENTER,
              Jimp.VERTICAL_ALIGN_MIDDLE
            )
            .quality(50)
            .greyscale();
        })
        .then((pic) => {
          return card.composite(pic, 147, 215, [Jimp.BLEND_DESTINATION_OVER]);
        })
        .then((card) => {
          Jimp.read(hand)
            .then((hand) => {
              return card.composite(hand, 276, 720, [
                Jimp.BLEND_DESTINATION_OVER,
              ]);
            })
            .then((card) => {
              Jimp.read(suitOne)
                .then((s1) => {
                  return card.composite(s1, 15, 15, [
                    Jimp.BLEND_DESTINATION_OVER,
                  ]);
                })
                .then((card) => {
                  Jimp.read(suitTwo)
                    .then((s2) => {
                      return card.composite(s2, 565, 15, [
                        Jimp.BLEND_DESTINATION_OVER,
                      ]);
                    })
                    .then((card) => {
                      Jimp.loadFont(
                        "./image-processing/assets/fonts/large/alagard.ttf.fnt"
                      ).then((font) => {
                        card
                          .print(font, 225, 800, res.locals.randomVals[0])
                          .print(font, 500, 800, res.locals.randomVals[1]);
                        card.getBufferAsync(Jimp.MIME_JPEG).then((buffer) => {
                          const imageData = buffer;
                          const createdBy = "";
                          Card.create({ createdBy, imageData }).then((card) => {
                            res.status(200).json(card);
                          });
                        });
                      });
                    });
                });
            });
        });
    })

    .catch((err) => {
      next(err);
    });
});

module.exports = router;
