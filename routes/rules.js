const router = require("express").Router();
const { findByIdAndUpdate } = require("../models/Rules");
const Rules = require("../models/Rules");

router.post("/", (req, res, next) => {
  const { name, explanation } = req.body;
  const createdBy = req.user;
  if (!name) {
    return res
      .status(400)
      .json({ message: "please enter a valid name for the ruleset" });
  }
  if (!explanation) {
    return res
      .status(400)
      .json({ message: "please enter an explanation for the ruleset" });
  }
  Rules.create({ name, explanation, createdBy })
    .then((rules) => {
      res.status(201).json(rules);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/", (req, res, next) => {
  Rules.find()
    .populate("createdBy")
    .then((rules) => {
      res.status(200).json(rules);
    })
    .catch((err) => res.json(err));
});

router.get("/rule/:id", (req, res, next) => {
  Rules.findById(req.params.id)
    .populate("createdBy")
    .populate("extensions.extendedBy")
    .then((rule) => {
      res.status(200).json(rule);
    })
    .catch((err) => res.json(err));
});

router.put("/rule/:id", (req, res, next) => {
  const { name, explanation } = req.body;
  Rules.findByIdAndUpdate(req.params.id, { name, explanation }, { new: true })
    .then((rule) => {
      res.status(200).json(rule);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/extend/:id", (req, res, next) => {
  const { extension } = req.body;
  const extendedBy = req.user;
  Rules.findByIdAndUpdate(req.params.id, {
    $push: { extensions: { extension, extendedBy } },
  })
    .then((rule) => {
      res.status(200).json(rule);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.put("/approve/:id", (req, res, next) => {
  const { _id } = req.body;
  Rules.findOneAndUpdate(
    { _id: req.params.id, "extensions._id": _id },
    { $set: { "extensions.$.approved": true } },
    {new:true}
  ).populate('extensions._id')
    .then((rule) => {
      res.status(200).json(rule);
    })
    .catch((err) => {
      res.json(err);
    });
});
module.exports = router;
