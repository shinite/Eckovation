var Insta = require('instamojo-nodejs');
var Store = require('../model/myStoreSchema')
var keys= require('../config/keys')

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


  app.post('/checkOut',(req,res)=>{
    console.log("in checkOut", req.body.total);
    Insta.setKeys(process.env.API_KEY, process.env.AUTH_TOKEN);

    var data = new Insta.PaymentData();

      data.purpose = "App";            // REQUIRED
      data.amount = req.body.total;                  // REQUIRED
      data.setRedirectUrl('https://ecknovation.herokuapp.com/cart/payment');

      Insta.createPayment(data, function(error, response) {
        if (error) {
          // some error
        } else {
          // Payment redirection link at response.payment_request.longurl
          console.log(response);
        //  res.redirect('http://mydomain.com'+req.url)
          res.send(response)
        }
      });

  })


}
