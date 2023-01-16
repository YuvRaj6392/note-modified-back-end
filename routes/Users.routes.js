const User=require('../controllers/Users.controllers')
module.exports=app=>{
    const router=require('express').Router();
    router.post('/',User.signup)
    router.post('/login',User.login)
    router.post('/logout',User.logout)
    app.use('/api',router);
}