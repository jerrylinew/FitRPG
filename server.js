/**
 * Created by jerrylinew on 4/29/16.
 */

var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var url = require('url');
var FitbitApiClient = require("fitbit-node");
var redirectURL = "http://fitrpg.herokuapp.com/";
var apiClient = new FitbitApiClient("227LR8", "0c5043e5c97351930aa2a3431cb79266");

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');

    var code = req.param("code");
    var promise = apiClient.getAccessToken(code, redirectURL);
    console.log(code);
    console.log(promise);

    promise.then(function(data){
        console.log(data);
    });
});

app.get('/setup', function(req, res){
    res.sendFile(__dirname + '/public/index.html');

    var authURL = apiClient.getAuthorizeUrl("activity heartrate sleep profile weight", redirectURL);
    res.redirect(authURL);
});

app.listen(port, function(){
    console.log('App listening on port 8080!');
});






