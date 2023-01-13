const db=require('./models');
const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const app=express();
var corsOption={
    origin:'http//localhost:3000'
};
app.use(cors(corsOption));
db.mongoose.connect(db.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(()=>{
    console.log('Connected to the database')
  }).catch((err)=>{
    console.log(err);
    process.exit();
  })
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended:true}));
  require('./routes/Users.routes')(app);
  require('./routes/Notes.routes')(app);
  app.get('/',(req,res)=>{
    res.json({
      message:'Welcome to the page!'
    })
  })
  app.listen(8080,()=>{
    console.log('Server is listening to port 8080');
  })