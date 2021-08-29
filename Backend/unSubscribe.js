var express = require('express');
var cheerio = require("cheerio");
var router = express.Router();
var request= require("request-promise");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:admin@producttracking.7oyuk.mongodb.net/admin1?retryWrites=true&w=majority";


var mail1;
router.delete('/',function(req, res) {
    mail1=req.query.user_email;
    MongoClient.connect(url, { useNewUrlParser: true ,useUnifiedTopology: true}, function(err, db) {
        if (err)
            throw err;
        var dbo = db.db("admin1");
        dbo.collection('maincollection').deleteMany({mail:mail1},function(err,result){
            console.log("Deleted");
            db.close();
        });
        
      });
      
      res.send("DELETION DONE");
});

module.exports = router;