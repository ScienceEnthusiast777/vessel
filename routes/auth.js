const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const passport = require("passport");
const app = require("../app");


router.post("/signup", (req, res, next) => {
  const { username, password } = req.body;
  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "password must be atleast 8 characters" });
  }
  if (username === "" || username.length > 8) {
    return res
      .status(400)
      .json( {message: 'please choose a valid username (cannot be empty or more than 8 characters)' });
  }
  User.findOne({ username: username }).then((DBUser) => {
    if (DBUser !== null) {
      return res
        .status(400)
        .json({
          message: "this username is already taken, please choose another",
        });
    } else {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);
      User.create({ username: username, password: hash }).then((newUser) => {
        req.login(newUser, err=>{
          if(err){
            return res.status(500).json({message:"error logging in"})
          }else{
            return res.status(200).json(newUser);
          }
        })
      })
      .catch(err=>{
        res.json(err);
      })
    }
  });
});

router.post('/login', (req,res,next)=>{
  passport.authenticate('local', (err,user)=>{
    if(err){
      return res.status(400).json({message: "error logging in"});
    }
    if(!user){
      return res.status(400).json({message: "incorrect login details"});
    }
    req.login(user,err=>{
      if(err){
        return res.status(500).json({message:"error loggin in"});  
      }
      return res.status(200).json(user);
    })
  })(req,res)
});

router.get('/loggedin', (req,res)=>{
  res.json(req.user);
})


router.delete('/logout', (req,res)=>{
  req.logout(); 
  res.status(200).json({message:'logged out'})
})

module.exports = router; 
