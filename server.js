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
app.use(express.static('public'));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/public/index.html');

    var code = req.param("code");
    console.log(code);
    //var options = {
    //    Authorization: 'Basic ' + new Buffer("Hello World").toString('base64');
    //    path: 'https://api.fitbit.com/oauth2/token';
    //    method: 'POST'
    //};


    apiClient.getAccessToken(code, redirectURL).then(function(data){
        console.log(data);
    }).catch(function (error){
        console.log("error promise");
    });
    console.log(code);
    console.log(promise);
});

app.get('/setup', function(req, res){
    res.sendFile(__dirname + '/public/index.html');

    var authURL = apiClient.getAuthorizeUrl("activity heartrate sleep profile weight", redirectURL);
    res.redirect(authURL);
});

app.listen(port, function(){
    console.log('App listening on port 8080!');
});






