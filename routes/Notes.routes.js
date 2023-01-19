const validateToken=require('../middleware/Auth');
const Note=require('../controllers/Notes.controllers')
module.exports=app=>{
    const router=require('express').Router();
    router.get('/notes',validateToken,Note.getNotes);
    router.post('/notes',validateToken,Note.uploadNotes);
    router.put('/notes/:id',validateToken,Note.editNotes);
    router.delete('/notes/:id',validateToken,Note.deleteNotes);
    app.use('/api',router)

}