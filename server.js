/**
 * Created by jerrylinew on 4/29/16.
 */

var express = require('express');
var http = require('http');
var app = express();
var port = process.env.PORT || 8080;
var url = require('url');
var FitbitApiClient = require("fitbit-node");
var redirectURL = "http://fitrpg.herokuapp.com/dashboard";
var apiClient = new FitbitApiClient("227LR8", "0c5043e5c97351930aa2a3431cb79266");
app.use(express.static('public'));

app.get('/', function(req, res){
    var authURL = apiClient.getAuthorizeUrl("activity heartrate sleep profile weight", redirectURL);
    res.redirect(authURL);
});

app.get('/getdata', function(req, res){
    var code = req.param("code");
    console.log(code);

    apiClient.getAccessToken(code, redirectURL).then(function(result){
        console.log(result);

        apiClient.get("/activities/date/2016-04-20.json", result.access_token).then(function (results) {
            console.log(results[0].summary.steps);
            res.status(200).send(results[0].summary.steps);
        });
    }).catch(function (error){
        console.log("error promise");
    });
});

app.get('/dashboard', function(req, res){
    res.sendFile(__dirname + '/public/home.html');
});

app.listen(port, function(){
    console.log('App listening on port 8080!');
});






