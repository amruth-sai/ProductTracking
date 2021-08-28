var request= require("request");
var cheerio = require("cheerio");
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'cvrita2018@gmail.com',
      pass: 'cvr12345'
    }
  });  

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://admin:admin@producttracking.7oyuk.mongodb.net/admin1?retryWrites=true&w=majority";

MongoClient.connect(url, { useNewUrlParser: true ,useUnifiedTopology: true},function(err, db) {
    if (err)
        throw err;
    var dbo = db.db("admin1");
  
    var cursor = dbo.collection('maincollection').find();

    cursor.each(function(err, item) {
    
        if(item == null) {
           db.close(); 
            return;
        }
        let res =  async function isChange(link,price){

            var cost;
            return request(link,async function(err,response,html){
                var $ = cheerio.load(html);
                $("#priceblock_ourprice").filter(function(){
                    var data=$(this);
                    cost=data.text();
                    //console.log(cost);
                    
                })
                $("#priceblock_dealprice").filter(function(){
                    var data=$(this);
                    cost=data.text();
                    //console.log(cost);
                })
                await cost;
                if(cost===price){
                    console.log(cost+" "+price);
                    // var mailOptions = {
                    //     from: 'cvrita2018@gmail.com',
                    //     to: item.mail,
                    //     subject: 'PRICE DROP ALERT',
                    //     text: 'Hurry! price drop on '+item.link
                    //   };
                      
                    //   transporter.sendMail(mailOptions, function(error, info){
                    //     if (error) {
                    //       console.log(error);
                    //     } else {
                    //       console.log('Email sent: ' + info.response);
                    //     }
                    //   });
                    return ;
                }
                else{
                    var mailOptions = {
                        from: 'cvrita2018@gmail.com',
                        to: item.mail,
                        subject: 'PRICE DROP ALERT',
                        text: 'Hurry! price drop on '+item.link
                      };
                      
                      transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });
                    return ;
                }
                
            });
        
        }
        res(item.link,item.price);
    });
   
});
