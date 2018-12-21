var twitterAPI = require('node-twitter-api');
var keys = require('./secret/keys');


var twitter = new twitterAPI({
    consumerKey: keys.apiKey,
    consumerSecret: keys.apiKeySecret,
    callback: keys.callbackUrl,
});

module.exports = {
    twitter,
    keys,
}