/**
 * Created by jerrylinew on 4/29/16.
 */

var express = require('express');
var http = require('http');
var app = express();
var port = process.env.PORT || 8080;
var url = require('url');
var FitbitApiClient = require("fitbit-node");
var redirectURL = "http://fitrpg2.herokuapp.com/dashboard";
var apiClient = new FitbitApiClient("227LR8", "0c5043e5c97351930aa2a3431cb79266");
var bodyParser = require('body-parser');
app.use(express.static('public'));

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var monsterImages = [
    "enemy.gif",
    "light.png",
    "earth.png",
    "fire.png",
    "shadow.png",
    "water.png",
    "grass.png"
];

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
    },
    Helmet: {
        name: "Helmet",
        price: "2500",
        image: "images/Helmet.png",
        stat: "Def",
        effect: 32
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
        user["userExp"] = 0;
        user["maxUserHP"] = 100;
        user["monsterStats"] = {
            HP: 100,
            Atk: 15,
            Exp: 10,
            Level: 0
        };

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

app.get('/getMonsterInfo', function(req, res) {
    var userID = req.query.userID;
    var data = {};
    data['monsterData'] = users[userID]["monsterStats"];
    data['image'] = monsterImages[users[userID]["monsterStats"]["Level"]];
    res.send(data);
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
   res.json(shopData);
});

app.get('/getStats', function(req, res) {
    var userID = req.query.userID;
    res.json(users[userID]["stats"]);
});

app.get('/getSteps', function(req, res){
    var userID = req.query.userID;
    res.json(users[userID]["dailyAwarded"]);
});

app.get('/getSleep', function(req, res){
    var userID = req.query.userID;
    res.json(users[userID]);
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

    var damage = users[userID]["monsterStats"]["Atk"] - users[userID]["stats"]["Def"];

    if(damage <= 0)
        damage = 1;

    users[userID]["stats"]["HP"] -= damage;

    if(users[userID]["stats"]["HP"] <= 0){
        users[userID]["stats"]["HP"] = 0;
        users[userID]["monsterData"]["HP"]
        data["isDead"] = true;
        users[userID]["coins"] = Math.round(users[userID]["coins"] * 0.8);
        data["coinsLeft"] = users[userID]["coins"];
    }
    else
        data["isDead"] = false;

    data["HP"] = users[userID]["stats"]["HP"];
    if(data["isDead"])
        users[userID]["stats"]["HP"] = users[userID]["maxUserHP"];
    res.send(data);
});

app.get('/getInfo');

app.get('/attackMonster', function(req, res){
    var userID = req.query.userID;
    users[userID]["monsterStats"]["HP"] -= users[userID]["stats"]["Atk"];

    if(users[userID]["monsterStats"]["HP"] < 0)
        users[userID]["monsterStats"]["HP"] = 0;

    var data = {};

    data["HP"] = users[userID]["monsterStats"]["HP"];

    if(data["HP"] <= 0){
        data["monsterDead"] = true;
        nextLevel(userID);
        users[userID]["userExp"] += users[userID]["monsterStats"]["Exp"];
        if(users[userID]["userExp"] >= 100){
            users[userID]["userExp"] = users[userID]["userExp"] - 100;

            data["levelUp"] = true;
            users[userID]["maxUserHP"] += 20;
            users[userID]["stats"]["HP"] = users[userID]["maxUserHP"];
            users[userID]["stats"]["Atk"] += 2;
            users[userID]["stats"]["Def"] += 2;
            data["stats"] = users[userID]["stats"];
            data["maxUserHP"] = users[userID]["maxUserHP"];
        }
        else
            data["levelUp"] = false;

        data["exp"] = users[userID]["userExp"];
    }
    else
        data["monsterDead"] = false;

    res.json(data);
});

function nextLevel(userID){
    users[userID]["monsterStats"]["HP"] += 50;
    users[userID]["monsterStats"]["Atk"] += 10;
    users[userID]["monsterStats"]["Exp"] += 5;
    users[userID]["monsterStats"]["Level"] += 1;
}

app.listen(port, function(){
    console.log('App listening on port 8080!');
});






