var express = require('express');
var cheerio = require("cheerio");
var router = express.Router();
var request= require("request-promise");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:admin@producttracking.7oyuk.mongodb.net/admin1?retryWrites=true&w=majority";



router.post('/',function(req, res) {
    console.log(req.body);
    var link1=req.body.link;
    var mail1=req.body.useremail;
    var cost;
    console.log(link1,mail1);
    request(link1, (err,res,html)=>{
        var $ = cheerio.load(html);
        
        $("#priceblock_dealprice").filter(function(){
            var data=$(this);
            cost=data.text();
           // console.log(cost);
            MongoClient.connect(url, { useNewUrlParser: true ,useUnifiedTopology: true},async function(err, db) {
                if (err) throw err;
                var dbo = db.db("admin1");
                var myobj={ link :link1,price:cost,mail:mail1};
                console.log(cost);
                dbo.collection("maincollection").insertOne(myobj,(err,res)=>{
                    if(err) throw err;
                    console.log("INSERTED");
                    db.close();
                })
                
              });
              return;

        })
       
        $("#priceblock_ourprice").filter(function(){
        var data=$(this);
        cost=data.text();
       // console.log(cost);
        MongoClient.connect(url, { useNewUrlParser: true ,useUnifiedTopology: true},async function(err, db) {
            if (err) throw err;
            var dbo = db.db("admin1");
            var myobj={ link :link1,price:cost,mail:mail1};
            console.log(cost);
            dbo.collection("maincollection").insertOne(myobj,(err,res)=>{
                if(err) throw err;
                console.log("INSERTED");
                db.close();
            })
            
          });
          return;       
        })
    })
    res.redirect('/');

});
module.exports = router;
