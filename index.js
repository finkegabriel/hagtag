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
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use('/', express.static(publicPath));

app.use(express.static('public'));

app.listen(2018, function () {
   console.log("app listening at ..here");
});


function searchTag(query) {
   api.twitter.get('search/tweets', { q: '%23"' + query + '"' }, function (err, data, response) {
      if (err) {
         console.log("error");
      } else {
         try {
            //var tweetPic = data.statuses[0].source;
            var twitText = data.statuses[0].text;
            console.log(twitText);
            tweets.unshift(twitText);
         } catch (error) {
            console.log('no tags yet bruh');
         }
      }
   })
}

app.get('/', (req, res, next) => {
   setInterval(() => {
      try {
         searchTag('hslhaxmas');
      } catch (error) {
         console.log('no tags yet bruh');
      }
   }, 300 * 1000);
   /*sending data to view*/
   res.render('index', { foo: tweets[0] });
});


