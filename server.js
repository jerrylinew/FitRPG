/**
 * Created by jerrylinew on 4/29/16.
 */

var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var url = require('url');
var FitbitApiClient = require("fitbit-node");
var redirectURL = "http://www.fitbitrpg.co/"

function fullUrl(req) {
    return url.format({
        protocol: req.protocol,
        host: req.get('host'),
        pathname: req.originalUrl
    });
}

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');

    var client = new FitbitApiClient("227LR8", "0c5043e5c97351930aa2a3431cb79266");
    var authURL = client.getAuthorizeUrl("activity heartrate sleep profile weight", redirectURL);

    console.log(authURL);
    console.log(fullUrl(req));

    var code = req.param('code');
    var promise = client.getAccessToken(code, redirectURL);
    console.log(promise);
});

app.listen(port, function(){
    console.log('App listening on port 8080!');
});






