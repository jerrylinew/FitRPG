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
var bodyParser = require('body-parser');
app.use(express.static('public'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var shopData = {
    Sword: {
        name: "Sword",
        price: "30",
        image: "/img/sword.jpg",
        stat: "Atk",
        effect: "+3"
    },
    Armor: {
        name: "Armor",
        price: "45",
        image: "/img/Armor.jpg",
        stat: "Def",
        effect: "+5"
    }
};

var users = {};

app.get('/', function(req, res){
    var authURL = apiClient.getAuthorizeUrl("activity heartrate sleep profile weight", redirectURL);
    res.redirect(authURL);
});

app.get('/getdata', function(req, res){
    var code = req.query.code;
    console.log(code);
    var user = {};

    apiClient.getAccessToken(code, redirectURL).then(function(result){
        console.log(result);
        user["userID"] = result.user_id;
        user["accessToken"] = result.access_token;
        user["refreshToken"] = result.refresh_token;
        user["coins"] = 0;
        user["stats"] = {
            HP: 100,
            Atk: 5,
            Def: 5
        }
        user["dailyAwarded"] = 0;

        apiClient.get("/profile.json", result.access_token).then(function (results) {
            user["name"] = results[0].user.fullName;
            user["gender"] = results[0].user.gender;
            console.log(user);
            if(users[result.user_id] == undefined)
                users[result.user_id] = user;
            user = users[result.user_id];
            res.json(user);
        });
    }).catch(function (error){
        console.log(error);
    });
});

app.get('/refreshdata', function(req, res){
    var user_ID = req.query.userID;
    var currentUser = users[user_ID];

    console.log("refreshing");
    console.log(user_ID);
    console.log(currentUser);

    var data = {};

    apiClient.get("/activities/date/today.json", users[user_ID].accessToken).then(function (results) {
        data["daySteps"] = results[0].summary.steps;
        data["coins"] = currentUser["coins"] + data["daySteps"] - currentUser["dailyAwarded"];

        users[user_ID]["dailyAwarded"] = data["daySteps"];
        users[user_ID]["coins"] = data["coins"];

        res.json(data);
    });
});

app.get('/setupShop', function(req, res) {
   res.send(shopData);
});

app.get('/getStats', function(req, res) {
    var userID = req.query.userID;
    res.send(users[userID]["stats"]);
});

app.get('/purchase', function(req, res){
    var purchasedItem = req.query.item;
    var userID = req.query.userID;
    var data = {};

    if(users[userID]["coins"] >= shopData[purchasedItem]["price"]) {
        users[userID]["coins"] -= shopData[purchasedItem]["price"];

        var stat = shopData[purchasedItem]["stat"];
        var effect = shopData[purchasedItem]["effect"]
        users[userID]["stats"][stat] += effect;

        data["status"] = true;
    }
    else
        data["status"] = false;

    data["coinsLeft"] = users[userID]["coins"];
    res.send(data);
});

app.get('/dashboard', function(req, res){
    res.sendFile(__dirname + '/public/home.html');
});

app.listen(port, function(){
    console.log('App listening on port 8080!');
});






