const Note=require('../controllers/Notes.controllers')
module.exports=app=>{
    const router=require('express').Router();
    router.get('/notes',Note.getNotes);
    router.post('/notes',Note.uploadNotes);
    router.put('/notes/:id',Note.editNotes);
    router.delete('/notes/:id',Note.deleteNotes);
    app.use('/api',router)

}