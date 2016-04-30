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

var users = {};

app.get('/', function(req, res){
    var authURL = apiClient.getAuthorizeUrl("activity heartrate sleep profile weight", redirectURL);
    res.redirect(authURL);
});

app.get('/getdata', function(req, res){
    var code = req.param("code");
    console.log(code);
    var user = {};

    apiClient.getAccessToken(code, redirectURL).then(function(result){
        console.log(result);
        user["userID"] = result.user_id;
        user["accessToken"] = result.access_token;
        user["refreshToken"] = result.refresh_token;

        apiClient.get("/profile.json", result.access_token).then(function (results) {
            user["name"] = results[0].user.fullName;
            user["gender"] = results[0].user.gender;
            console.log(user);
            users[result.user_id] = user;
            res.json(user);
        });
    }).catch(function (error){
        console.log(error);
    });
});

app.get('/refreshdata', function(req, res){
    var user_ID = req.param("userID");
    console.log("refreshing");

    var data = {};

    apiClient.get("/activities/date/today.json", users[user_ID].accessToken).then(function (results) {
        data["daySteps"] = results[0].summary.steps;
        res.json(data);
    });
});

app.get('/dashboard', function(req, res){
    res.sendFile(__dirname + '/public/home.html');
});

app.listen(port, function(){
    console.log('App listening on port 8080!');
});






