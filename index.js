var http = require('request');
var url = require('url');
var express = require('express');
var exphbs = require('express-handlebars');
var handlebars = require('handlebars');
var app = express();
var api = require('./hagtag');
const path = require('path');
const publicPath = path.join(__dirname, './hbs');
var helpers = require('handlebars-helpers');
var tweets = [];
const bodyParser = require('body-parser');
var reload = require('reload')

app.engine('handlebars', exphbs({
   defaultLayout: 'main'/*,
   helpers: {
      foo: function () { return 'FOO!'; },
      bar: function () { return 'BAR!'; }
   }*/
}));
app.set('view engine', 'handlebars');

app.use('/', express.static(publicPath), bodyParser.json());

app.use(express.static('public'));

app.listen(2018, function () {
   console.log("app listening at ..here");
});


function searchTag(query) {
   api.twitter.get('search/tweets', { q: '%23"' + query + '"' }, function (err, data, response) {
      if (err) {
         console.log("error");
      } else {
         var twitText = data.statuses[0].text;
         console.log(twitText);
         tweets.unshift(twitText);
         /*sending data to view*/

      }
   })
}

app.get('/', (req, res, next) => {
   setInterval(() => {
      searchTag('hslhaxmas');
   }, 30 * 1000);
   res.render('index',{foo:tweets[0]});
});


