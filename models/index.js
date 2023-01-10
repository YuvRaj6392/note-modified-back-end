const mongoose=require('mongoose');
const dbConfig=require('../config/db.config');
const db={};
db.mongoose=mongoose;
db.url=dbConfig;
db.users=require('./Users.models')(mongoose);
db.notes=require('./Notes.models')(mongoose);
module.exports=db;
