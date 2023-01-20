const db=require('../models');
const Note=db.notes;

//controller to get notes
exports.getNotes=(req,res)=>{
    res.json({
        message:'get notes'
    })
}


//controller to upload notes
exports.uploadNotes=(req,res)=>{
    res.json({
        message:'upload notes'
    })
}


//controller to edit note
exports.editNotes=(req,res)=>{
    res.json({
        message:'edit notes'
    })
}


//controller to delete note
exports.deleteNotes=(req,res)=>{
    res.json({
        message:'delete notes'
    })
}