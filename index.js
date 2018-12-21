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

app.get('/callback', function (req, res) {
   api.twitter.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function (err, data, response) {
      console.log(err);
      console.log(response)
   });
   /*api.twitter.search("q=%23haxmas",api.keys.apiKey,api.keys.apiKeySecret,function(err,res){
      console.log(err);
      console.log(res)
   });*/
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