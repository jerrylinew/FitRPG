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
var apiClient = new FitbitApiClient("227LQ8", "423b0bc800fe693e1f425a80f363e65a");
var bodyParser = require('body-parser');
app.use(express.static('public'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var monsterData = [
    {
        name: "Destructor",
        health: "50",
        attack: "5",
        experience: "70"
    }
];
//
var shopData = {
    Dagger: {
        name: "Dagger",
        price: "300",
        image: "images/Dagger.png",
        stat: "Atk",
        effect: 3
    },
    Armor: {
        name: "Armor",
        price: "450",
        image: "images/Armor.png",
        stat: "Def",
        effect: 5
    },
    Potion: {
        name: "Potion",
        price: "600",
        image: "images/Potion.png",
        stat: "HP",
        effect: 10
    },
    Shuriken: {
        name: "Shuriken",
        price: "1200",
        image: "images/Shuriken.png",
        stat: "Atk",
        effect: 15
    }
};

var users = {};

app.get('/', function(req, res){
    var authURL = apiClient.getAuthorizeUrl("activity heartrate sleep profile weight", redirectURL);
    res.redirect(authURL);
});

app.get('/getdata', function(req, res){
    var code = req.query.code;
    var user = {};

    apiClient.getAccessToken(code, redirectURL).then(function(result){
        user["userID"] = result.user_id;
        user["accessToken"] = result.access_token;
        user["refreshToken"] = result.refresh_token;
        user["coins"] = 0;
        user["currentLevel"] = 0;
        user["stats"] = {
            HP: 100,
            Atk: 5,
            Def: 5
        };
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

app.get('/getSteps', function(req, res){
    var userID = req.query.userID;
    res.send(users[userID]["dailyAwarded"]);
});

app.get('/getSleep', function(req, res){
    var userID = req.query.userID;
    res.send(users[userID]);
});

app.get('/purchase', function(req, res){
    var purchasedItem = req.query.item;
    var userID = req.query.userID;
    var data = {};

    if(users[userID]["coins"] >= shopData[purchasedItem]["price"]) {
        users[userID]["coins"] -= shopData[purchasedItem]["price"];

        var stat = shopData[purchasedItem]["stat"];
        var effect = shopData[purchasedItem]["effect"];
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

app.get('/attacked', function(req, res){
    var userID = req.query.userID;
    var data = {};

    if(userID == undefined) {
        res.send(data);
        return;
    }
    users[userID]["stats"]["HP"] -= monsterData[users[userID]["currentLevel"]]["attack"];

    if(users[userID]["stats"]["HP"] <= 0){
        users[userID]["stats"]["HP"] = 0;
        data["isDead"] = true;
    }
    else
        data["isDead"] = false;

    data["HP"] = users[userID]["stats"]["HP"];
    res.send(data);
});

app.listen(port, function(){
    console.log('App listening on port 8080!');
});






