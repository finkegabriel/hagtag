var twitterAPI = require('node-twitter-api');
var keys = require('./secret/keys');

var twitter = new twitterAPI({
    consumerKey: keys.apiKey,
    consumerSecret: keys.apiKeySecret,
    callback: keys.callbackUrl,
});

twitter.getRequestToken(function(error, requestToken, requestTokenSecret, results){
    if (error) {
        console.log("Error getting OAuth request token : " + error);
    } else {
        console.log("token request "+requestToken);
        console.log("token secret ")+requestTokenSecret;
    }
});

twitter.getAccessToken(requestToken, requestTokenSecret, oauth_verifier, function(error, accessToken, accessTokenSecret, results) {
    if (error) {
        console.log(error);
    } else {
        //store accessToken and accessTokenSecret somewhere (associated to the user)
        //Step 4: Verify Credentials belongs here
    }
});

module.exports = {
    twitter,
    keys,
}