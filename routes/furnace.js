const router = require("express").Router();
const Jimp = require("jimp");
const multer = require("multer");
const fs = require("fs");

let template = "./image-processing/assets/major-template.jpg";
let hand = "./image-processing/assets/hands/one.jpg";

let imgActive = "./image-processing/active/active.jpg";
let imgExport = "./image-processing/exports/export.jpg";

// router.get("/", (req, res, next) => {
//   Jimp.read("./testImg/card-tester.jpg")
//     .then((card) => {
//       Jimp.read(hand)
//         .then((h) => {
//           return card.composite(h, 30, 30, [Jimp.BLEND_DESTINATION_OVER]);
//         })
//         .then((card) => {
//           Jimp.read("./testImg/dog-edit.jpg").then((d) => {
//             return card
//               .composite(d, 100, 100, [Jimp.BLEND_DESTINATION_OVER])
//               .write("./testImg/exports/poopoo.jpg");
//           });
//         });
//     })

//     .catch((err) => {
//       console.log(err);
//     });
// });

const upload = multer();
router.post("/", upload.single("file"), (req, res, next) => {
  console.log(req.file);
  Jimp.read(req.file.buffer)
    .then((file) => {
      console.log('here is the file', file)
      return file
        .scaleToFit(450, 450)
        .quality(100)
        .greyscale()
        .write(imgExport);
    })
    .then((file) => {
      res.status(200).json(file);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
