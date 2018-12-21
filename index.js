var http = require('request');
var url  = require('url');
var express = require('express');
var exphbs = require('express-handlebars');
var app = express();
var api = require('./hagtag');
const path = require('path');
const publicPath = path.join(__dirname, './hbs');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use('/', express.static(publicPath));

app.use(express.static('public'));

app.get('/', function (req, res) {
   api.twitter.search("q=%23haxmas",api.keys.apiKey,api.keys.apiKeySecret,function(err,res){
      console.log(err);
      console.log(res)
   });
   
   res.render('index');
});

var server = app.listen(2018, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
});                                         