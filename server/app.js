const express= require('express');
const app= express();
const mongoose = require('mongoose');
const path = require('path');
const store = require('./routes/store')
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.json());


const publicPath = path.join(__dirname,'..', 'public')
app.use(express.static(publicPath))
//mongodb://shinite:anisham%40123@ds121248.mlab.com:21248/storehouse
//mongodb://<dbuser>:<dbpassword>@ds237808.mlab.com:37808/storehouse
// const db = mongoose.createConnection('mongodb://shinite:anisham%40123@ds237808.mlab.com:37808/storehouse',(err,database)=>{
//   if(err){
//     console.log("Not Able to connect to Database");
//   }else {
//     console.log("connection to database was sucessful");
//   }
// })

//mongodb://<dbuser>:<dbpassword>@ds237808.mlab.com:37808/storehouse

const db = mongoose.createConnection('mongodb://shinite:anisham%40123@ds121248.mlab.com:21248/wordsdb',(err,database)=>{
  if(err){
    console.log("Not Able to connect to Database");
  }else {
    console.log("connection to database was sucessful");
  }
})

store(app,db)


app.get('*',(req,res)=>{
 res.sendFile(path.join(publicPath,'index.html'))
})

app.listen(port, ()=> console.log('server is up!'))
