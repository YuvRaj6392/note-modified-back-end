
//here we are checking if the token is valid or not

const jwt=require('jsonwebtoken');
const secret = "shruv";
module.exports=(req,res,next)=>{
const token=req.headers["x-access-token"] || req.headers["Authorization"];
if(!token)
{
    return res.status(401).json({
        success:false,
        message:"Access Denied. No token provided!"
    })
}
try
{
    jwt.verify(token,secret);
    next();
}
catch(ex)
{
    res.status(400).json({
        success:false,
        message:"Invalid token"
    })
}
}