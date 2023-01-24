const db=require('../models');
const Note=db.notes;

//controller to get notes
exports.getNotes=(req,res)=>{
    Note.find({user:req.query.user},(err,data)=>{
        if(!data)
        {
            return res.status(404).json({
                success:false,
                message:"No notes found from this user"
            })
        }
        res.status(200).json({
            success:true,
            message:data
        })
    })
}


//controller to upload notes
exports.uploadNotes=(req,res)=>{
    const note=new Note({
        user:req.body.user,
        title:req.body.title,
        description:req.body.description,
        tag:req.body.tag
    })
    note.save(note).then((user)=>{
        res.status(201).json({
            success:true,
            message:user
        })
    }).catch(err=>{
        res.status(500).json({
            success:false,
            message:"Some error occurred!"
        })
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