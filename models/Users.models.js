module.exports=mongoose=>{
    const User=mongoose.model('user',mongoose.Schema({
        name:{type:String,required:true,index:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true,minlength:8,maxlength:32}
    },{
        timestamps:true
    }));
    return User;
}