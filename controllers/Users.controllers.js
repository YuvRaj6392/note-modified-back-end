const db = require("../models");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const secret="shruv";
const User = db.users;

//controller for the signup
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }, (err, data) => {
    if (data === null) {
      const password = req.body.password;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      User.create({
        email:req.body.email,
        name:req.body.name,
        password:hash
      }).then(user=>{
        res.status(200).json({
            success:true,
            message:user
        })
      }).catch(err=>{
        res.status(500).json({
            success:false,
            message:'Some error occurred'
        })
      })
    } else {
        res.status(500).json({
            success:false,
            message:'Account already exists'
        })
    }
  });
};

//controller for login
exports.login = (req, res) => {
  const {email,password}=req.body;
  User.findOne({email:email}).then(user=>{
    if(!user)
    {
      res.status(400).json({
        success:false,
        message:"Please try again with correct initials"
      })
    }
    else
    {
      const comparePassword=bcrypt.compareSync(password,user.password);
      if(!comparePassword)
      {
        res.status(400).json({
          success:false,
          message:"Please try again with correct initials"
        })
      }
      else
      {
        const data=user.id;
        const jwtToken=jwt.sign(data,secret);
        res.status(200).json({
          success:true,
          message:{
            id:user.id,
            token:jwtToken
          }
        })

      }
    }
  }).catch((err)=>{
    res.status(500).json({
      success:false,
      message:"Internal Server Error!"
    })
  })
};

//controller for logout
exports.logout = (req, res) => {
  res.json({
    message: "logout",
  });
};
