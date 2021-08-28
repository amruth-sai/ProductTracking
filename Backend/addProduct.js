var express = require('express');
var cheerio = require("cheerio");
var router = express.Router();
var request= require("request-promise");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:admin@producttracking.7oyuk.mongodb.net/admin1?retryWrites=true&w=majority";
var cost,link1,mail1;


router.post('/',function(req, res) {
    
    // console.log(req.query.link);
    // console.log(req.query.user_email);
    
    link1=req.query.link;
    getPrice(link1)
    //console.log(cost);
    mail1=req.query.user_email;
    res.send("DONE");

});
function getPrice(link){
   
    request(link, (err,res,html)=>{
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
    

}
//getPrice("https://www.amazon.in/Sounce-Connector-Cancelling-Headphones-Converter/dp/B08P8JGWP8/?_encoding=UTF8&pd_rd_w=zpLdd&pf_rd_p=4222dc74-f68c-40a8-ba4f-7f439ebc2a21&pf_rd_r=XVFWVXT49RY6JKF30Y19&pd_rd_r=7db80d2c-9945-4de8-bd99-7a7860a2e896&pd_rd_wg=ugt5s&ref_=pd_gw_hl_comp_mis_psims");
module.exports = router;
