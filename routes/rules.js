const router = require("express").Router();
const Rules = require("../models/Rules");

router.post((res,req,next)=>{
  const {name, explanation} = req.body;
  const createdBy = req.user;
  if(!name){
    return res.status(400).json({message: "please enter a valid name for the ruleset"});
  }
  if(!explanation){
    return res.status(400).json({message: "please enter an explanation for the ruleset"})
  }
  Rules.create({name, explanation, createdBy})
  .then(rules=>{
    res.status(201).json(rules)
  })
  .catch(err=>{
    res.json(err)
  })
}
)


module.exports = router;
