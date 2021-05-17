const router = require("express").Router();
const Jimp = require("jimp");
const multer = require("multer");
const fs = require("fs");
const app = require("../app");
const { RandomGenerator } = require("./middlewares");
const { write } = require("jimp");
const Card = require("../models/Card");
const { base } = require("../models/Card");

let template = "./image-processing/assets/major-template.jpg";
let imgExport = "./image-processing/exports/export.jpg";
let blank = "./image-processing/assets/blank.jpg";

router.get("/", (req, res, next) => {
  var selection = [];
  Card.aggregate([{ $sample: { size: 9 } }])
    .then((sample) => {
      selection = [...sample];
      Jimp.read(blank).then((background) => {
        Jimp.read(selection[0].imageData.buffer).then((s1) => {
          return background.composite(s1, 15, 15, [Jimp.BLEND_DESTINATION_OVER])
        })
        .then((background)=>{
          Jimp.read(selection[1].imageData.buffer).then((s2) => {
            return background.composite(s2, 868, 15, [Jimp.BLEND_DESTINATION_OVER])
          })
          .then((background)=>{
            Jimp.read(selection[2].imageData.buffer).then((s3) => {
              return background.composite(s3, 1721, 15, [Jimp.BLEND_DESTINATION_OVER])
            })
            .then((background)=>{
              Jimp.read(selection[3].imageData.buffer).then((s4) => {
                return background.composite(s4, 15, 1234, [Jimp.BLEND_DESTINATION_OVER])
              })
              .then((background)=>{
                Jimp.read(selection[4].imageData.buffer).then((s5) => {
                  return background.composite(s5, 868, 1234, [Jimp.BLEND_DESTINATION_OVER])
                })
                .then((background)=>{
                  Jimp.read(selection[5].imageData.buffer).then((s6) => {
                    return background.composite(s6, 1721, 1234, [Jimp.BLEND_DESTINATION_OVER])
                  })
                  .then((background)=>{
                    Jimp.read(selection[6].imageData.buffer).then((s7) => {
                      return background.composite(s7, 15, 2454, [Jimp.BLEND_DESTINATION_OVER])
                    })
                    .then((background)=>{
                      Jimp.read(selection[7].imageData.buffer).then((s8) => {
                        return background.composite(s8, 868, 2454, [Jimp.BLEND_DESTINATION_OVER])
                      })
                      .then((background)=>{
                        Jimp.read(selection[8].imageData.buffer).then((s9) => {
                          return background.composite(s9, 1721, 2454, [Jimp.BLEND_DESTINATION_OVER])
                          .getBase64Async(Jimp.MIME_JPEG).then((base64)=>{
                            res.status(200).json(base64);
                          })
                        })
                      })
                    })
                  })
                })
              })
            })
          })
        })
      });
    })
    .catch((err) => {
      res.json(err);
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
      res.json(err);
    });
});

module.exports = router;
