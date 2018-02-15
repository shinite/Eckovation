
var Store = require('../model/myStoreSchema')

module.exports = function(app,db) {

  app.get('/getItemsFromStore',(req,res)=>{
    console.log("in get Items");
    db.collection('myStore').find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
           res.json(result)
        })
  })

  app.get('/getItemsFromCart',(req,res)=>{
    console.log("in get Items");
    db.collection('myCart').find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
           res.json(result)
        })
  })

  app.post('/addToCart',(req,res)=>{
    console.log("in get Items", req.body);
    db.collection("myCart").insert(req.body).then(function(){
      console.log("success");
    }).catch(function(err){
      console.log("error");
    })

  })

  app.post('/removeFromCart',(req,res)=>{
    
    console.log("in get Items", req.body);
    db.collection("myCart").remove(req.body).then(function(){
      console.log("success removing");
    }).catch(function(err){
      console.log("error");
    })

    db.collection('myCart').find({}).toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
           res.json(result)
        })


  })



}
