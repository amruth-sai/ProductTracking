const express = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
var addProduct = require('./addProduct');
var unSubscribe = require('./unSubscribe');


app.use('/addProduct',addProduct);
app.use('/unSubscribe',unSubscribe);
app.get('/', (req, res) => {
  res.sendFile(__dirname+"/"+"index.html");
  
});

app.listen(8000, () => {
  console.log("Example app listening at http://localhost:8000")
});