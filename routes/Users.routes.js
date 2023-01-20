const validateToken=require('../middleware/Auth');
const User=require('../controllers/Users.controllers')
module.exports=app=>{
    const router=require('express').Router();
    router.post('/signup',User.signup)
    router.post('/login',User.login)
    router.post('/logout',User.logout)
    router.get('/usersOnline',validateToken,User.getAllUsers)
    app.use('/api',router);
}