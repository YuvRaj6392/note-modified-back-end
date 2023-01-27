const db=require('../models');
const Note=db.notes;

//controller to get notes
exports.getNotes=(req,res)=>{
    user=req.user
    Note.find({user},(err,data)=>{
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
    user=req.user
    const note=new Note({
        user:user,
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
exports.editNotes= async (req,res)=>{
    user=req.user;
    const {title,description,tag}=req.body;
    const newData={};
    if(title)
    {
        newData.title=title
    }
    if(description)
    {
        newData.description=description
    }
    if(tag)
    {
        newData.tag=tag;
    }
    await Note.findOneAndUpdate({_id:req.params.id,user:user},{$set:newData},{new:true}).then((data)=>{
        
        res.status(200).json({
            success:true,
            message:data
        })
    }).catch(()=>{
        res.status(500).json({
            success:false,
            message:"An error occurred!"
        })
    })
}


//controller to delete note
exports.deleteNotes= async(req,res)=>{
    user=req.user;
    
    await Note.findOneAndDelete({_id:req.params.id,user:user}).then((data)=>{
        res.status(200).json({
            success:true,
            message:data
        })
    }).catch((err)=>{
        res.status(500).json({
            success:false,
            message:"Some error occurred!"
        })
    })
}