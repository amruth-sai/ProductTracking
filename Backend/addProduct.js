var express = require('express');
var cheerio = require("cheerio");
var router = express.Router();
var request= require("request");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:admin@producttracking.7oyuk.mongodb.net/admin1?retryWrites=true&w=majority";



router.post('/',function(req, res) {
    
    // console.log(req.query.link);
    // console.log(req.query.user_email);
    MongoClient.connect(url, { useNewUrlParser: true ,useUnifiedTopology: true},function(err, db) {
        if (err) throw err;
        var dbo = db.db("admin1");
        var link1=req.query.link;
        var price1=getPrice(link1);
        console.log(price1);
        // getPrice(link1).then(function(res){
        //     price1=link1;
        //     console.log(price1);
        // });
        
        var mail1=req.query.user_email;
        var myobj={ link :link1,price:price1,mail:mail1};
        dbo.collection("maincollection").insertOne(myobj,(err,res)=>{
            if(err) throw err;
            console.log("INSERTED");
            db.close();
        })
        
      });
      res.send("DONE");

});
async function getPrice(link){
    var cost;
    request(link, async (err,res,html)=>{
        var $ = cheerio.load(html);
        $("#priceblock_ourprice").filter(function(){
        var data=$(this);
        cost=data.text();
       // console.log(cost);         
        })
        $("#priceblock_dealprice").filter(function(){
        var data=$(this);
        cost=data.text();
       // console.log(cost);
        })
        //console.log(cost);
        return await (cost);
    })
    

}
//getPrice("https://www.amazon.in/Sounce-Connector-Cancelling-Headphones-Converter/dp/B08P8JGWP8/?_encoding=UTF8&pd_rd_w=zpLdd&pf_rd_p=4222dc74-f68c-40a8-ba4f-7f439ebc2a21&pf_rd_r=XVFWVXT49RY6JKF30Y19&pd_rd_r=7db80d2c-9945-4de8-bd99-7a7860a2e896&pd_rd_wg=ugt5s&ref_=pd_gw_hl_comp_mis_psims");
module.exports = router;
