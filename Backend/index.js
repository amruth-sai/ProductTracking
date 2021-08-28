const express = require('express');
const path = require('path');
var bodyParser = require('body-parser')
const app = express();
app.use(express.json());

var addProduct = require('./addProduct');

app.use('/addProduct',addProduct);

app.get('/', (req, res) => {
  res.sendFile(__dirname+"/"+"index.html");
  
});

app.listen(3000, () => {
  console.log("Example app listening at http://localhost:3000")
});