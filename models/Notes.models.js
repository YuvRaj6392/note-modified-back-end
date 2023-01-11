module.exports=mongoose=>{
    const Note=mongoose.model('note',mongoose.Schema({
        user:{
            type:mongoose.Types.ObjectId, ref:'User'
        },
        title:{type:String, required:true},
        description:{type:String, required:true},
        tag:{type:String, default:"General"}
    }))
    return Note;
}