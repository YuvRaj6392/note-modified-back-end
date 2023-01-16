const db = require("../models");
const bcrypt = require("bcrypt");
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
  res.json({
    message: "login",
  });
};

//controller for logout
exports.logout = (req, res) => {
  res.json({
    message: "logout",
  });
};
