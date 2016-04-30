/**
 * Created by jerrylinew on 4/29/16.
 */

var express = require('express');
var http = require('http');
var app = express();
var port = process.env.PORT || 8080;
var url = require('url');
var FitbitApiClient = require("fitbit-node");
var redirectURL = "http://fitrpg.herokuapp.com/";
var apiClient = new FitbitApiClient("227LR8", "0c5043e5c97351930aa2a3431cb79266");
app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/home.html');

    var code = req.param("code");
    console.log(code);

    apiClient.getAccessToken(code, redirectURL).then(function(result){
        console.log(result);
        apiClient.get("/profile.json", result.access_token).then(function (results) {
            console.log(results[0]);
        });
        apiClient.get("/activities/steps/date/2016-04-20/1d/1min.json", result.access_token).then(function (results) {
            console.log(results);
        });
    }).catch(function (error){
        console.log("error promise");
    });
});

app.get('/setup', function(req, res){
    res.sendFile(__dirname + '/public/home.html');

    var authURL = apiClient.getAuthorizeUrl("activity heartrate sleep profile weight", redirectURL);
    res.redirect(authURL);
});

app.listen(port, function(){
    console.log('App listening on port 8080!');
});






