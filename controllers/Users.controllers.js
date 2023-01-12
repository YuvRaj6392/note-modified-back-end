const db=require('../models');
const User=db.users;

//controller for the signup
exports.signup=(req,res)=>{
    res.json({
        message:'signup'
    })
}


//controller for login
exports.login=(req,res)=>{
    res.json({
        message:'login'
    })
}


//controller for logout
exports.logout=(req,res)=>{
    res.json({
        message:'logout'
    })
}