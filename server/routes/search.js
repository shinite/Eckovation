
const Jimp = require("jimp");
const Scraper = require ('images-scraper')
  , google = new Scraper.Google();
const searchWordSchema = require('../model/searchWordSchema')
var mongoose=require("mongoose");
const path = require('path');
const fs = require('fs');

module.exports = function(app,db) {

  app.post('/search', function (req, res) {
    var result = false;
    const input = req.body.input;
    google.list({
        keyword: input,
        num: 15,
        detail: true,
    })
    .then(function (res) {
        res.map((data,index)=>{
          const url = data.url;
          const extension = url.split('.')[url.split('.').length-1]
          const foldername=input
          Jimp.read(url, function (err, image) {
          image.resize(250, 250)
             .greyscale()                 // set greyscale
             .write(path.join(__dirname,"../../public/images/"+foldername+"/"+foldername+index+"."+extension)); 
              });

        })
          }).catch(function(err) {

              res.send('There was some error')
          }).then(
        		function(){
            var searchInput = new searchWordSchema({
              word: req.body.input,
            })

            db.collection("searchWord").find({word: req.body.input}).toArray(function(err, result) {
                if (err) throw err;
                if(result.length == 0){
                    db.collection("searchWord").insert(searchInput, {upsert:true})
                }
            })
          }).then(function(){
            res.send('You can now view the Images')
          }).catch(function(err){
            res.send('There was some error')
          })
    })

    app.get('/getData',(req,res)=>{
        db.collection('searchWord').find({}).toArray(function(err, result) {
          if (err) throw err;
          res.json(result)
      })
   })

    app.post('/getImages',(req,res)=>{
      const testFolder = path.join(__dirname,"../../public/images",req.body.input);
      const arr=[];

      fs.readdir(testFolder, (err, files) => {
        if(files!=undefined){
          files.forEach(file => {
            arr.push(file)
          });
        }
          res.send(arr);
      })

    })


}
