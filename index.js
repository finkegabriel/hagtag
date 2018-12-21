var http = require('request');
var url = require('url');
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

app.get('/callback', function (req, res,hagtag) {

   hagtag= 'haxmas';
   api.twitter.get('search/tweets', { q: '%23"'+hagtag+'"'}, function (err, data, response) {
      if(err){
         console.log("error");
      }else{
         let dataFunc = JSON.stringify(data.statuses);
        console.log(dataFunc);
      }
   });
   res.render('index');
});

app.get('/', function (req, res) {
   res.redirect('/callback');
});


var server = app.listen(2018, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
});                                         