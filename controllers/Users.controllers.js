const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = "shruv";
const User = db.users;


//controller for the signup
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }, (err, data) => {
    if (data === null) {
      const password = req.body.password;
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      User.create({
        email: req.body.email,
        name: req.body.name,
        password: hash,
        isLoggedIn: false,
      })
        .then((user) => {
          res.status(200).json({
            success: true,
            message: user,
          });
        })
        .catch((err) => {
          res.status(500).json({
            success: false,
            message: "Some error occurred",
          });
        });
    } else {
      res.status(500).json({
        success: false,
        message: "Account already exists",
      });
    }
  });
};

//controller for login
exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        res.status(400).json({
          success: false,
          message: "Please try again with correct credentials",
        });
      } else {
        const comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
          res.status(400).json({
            success: false,
            message: "Please try again with correct initials",
          });
        } else {
          const update = { isLoggedIn: true };
          User.findOneAndUpdate({ email: email }, update, {
            userFindAndModify: false,
          }).then((user) => {
            if (!user) {
              res.status(500).json({
                success: false,
                message: "Some error occurred!",
              });
              return;
            }

            const data = user.id;
            const jwtToken = jwt.sign(data, secret);
            res.status(200).json({
              success: true,
              message: {
                id: user.id,
                token: jwtToken,
              },
            });
          }).catch(err=>{
            res.status(500).json({
              success: false,
              message: err,
            });
          });
        }
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Internal Server Error!",
      });
    });
};

//controller for logout
exports.logout = (req, res) => {
  user=req.user
  
  const update = { isLoggedIn: false };
  User.findOneAndUpdate({_id:user}, update, {
    userFindAndModify: false,
  }).then(user=>{
    res.status(200).json({
      success: true,
      message:user
    });
  }).catch(err=>{
    res.status(500).json({
      success: false,
      message: "Some error occurred!",
    });
  })
};



//controller to get all the users from the database(to see who is online and who is not!)
exports.getAllUsers=(req,res)=>{
  User.find({},{name:1,isLoggedIn:1},(err,data)=>{
    if(!data)
    {
      return res.status(400).json({
        success:false,
        message:"No users were found!"
      })
    }
    res.status(200).json({
      success:true,
      message:data
    })
    const user=data;
    
    for(let i=0;i<user.length;i++)
    {
      if(user[i].isLoggedIn)
      {
        console.log(`${user[i].name} is online`)
      }
      else
      {
        console.log(`${user[i].name} is offline`)
      }
    }
    
  })
}
