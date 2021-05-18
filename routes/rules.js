const router = require("express").Router();
const Rules = require("../models/Rules");

router.post("/", (req, res, next) => {
  console.log(req.body);
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

router.get("/", (req,res,next)=>{
  Rules.find().populate('createdBy')
  .then(rules=>{
    console.log("found rules : ", rules)
    res.status(200).json(rules);
  })
  .catch(err=>res.json(err))
})

router.get("/rule/:id", (req, res, next)=>{
  Rules.findById(req.params.id).populate('createdBy')
  .then(rule=>{
    res.status(200).json(rule);
  })
  .catch(err=>res.json(err))
})

module.exports = router;
