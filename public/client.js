/**
 * Created by jerrylinew on 4/29/16.
 */

var code;
var userID;
var userName;
var userGender;
var userCoins;

var stepDisplay = $('#stepDisplay');
var greetingDisplay = $('#greetingDisplay');
var coinsDisplay = $('#coinsDisplay');
var shopDisplay = $('#shopContainer');
var inventoryDisplay = $('#inventoryContainer');
var statsDisplay = $('#statsContainer');

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(document).ready(function() {

    code = getParameterByName("code");
    console.log(code);

    $.get("/getdata", {code: code}).done(function(data) {
        console.log("getting data");
        console.log(data);
        userID = data.userID;
        userName = data.name;
        userGender = data.gender;
        greetingDisplay.html("Hi " + userName);
        greetingDisplay.css('font-size', '150px');

        var refreshInterval = 1; //in minutes
        console.log("getting steps");

        $.get("/refreshdata", {userID: userID}).done(function(data) {
            userCoins = data["coins"];
            var daySteps = data["daySteps"];

            stepDisplay.html(daySteps);
            stepDisplay.css('font-size', '300px');
            coinsDisplay.html(userCoins); //to change
            coinsDisplay.css('font-size', '300px');
        });

        setInterval(getCallback(userID), 1000 * 60 * refreshInterval);

        //displayShop({Sword: {name: "Sword", price: 30, stat: "Atk", effect: 3}});
        $.get("/setupShop").done(function(data){
            displayShop(data);
        });

        $.get("/getStats", {userID: userID}).done(function(data){
            displayStats(data);
        });
    });
});


function displayShop(shopData) {

    for (var index in shopData) {
        var shopObject = shopData[index];
        var shopObjectDiv = $('<div class="shopObject"></div>');
        shopObjectDiv.css("width", "270px");
        shopObjectDiv.css("height", "40px");

        var shopObjectDetails = $('<div class="shopObjectDetails"></div>');
        shopObjectDetails.css("width", "200px");
        shopObjectDetails.css("height", "40px");
        shopObjectDetails.css("float", "left");
        shopObjectDetails.html(shopObject["name"]);

        var purchaseButton = $('<button class="purchaseButton" style="background: url(images/coin.jpg)"></button>');
        purchaseButton.css("background", "url(images/coin.jpg) no-repeat");
        purchaseButton.css("background-size", "contain");
        purchaseButton.css("width", "70px");
        purchaseButton.css("height", "40px");
        purchaseButton.css("float", "left");
        purchaseButton.css("text-align", "right");
        purchaseButton.css("font-size", "18px");
        purchasButton.html(shopObject["price"]);

        //var keyDict = {   // key to display, and show/hide boolean
        //    name: {k: "", toDisplay: true, size: "20px"},
        //    price: {k: "Price: ", toDisplay: true, size: "14px"},
        //    stat: {k: "Stat: ", toDisplay: true, size: "14px"},
        //    effect: {k: "Effect: +", toDisplay: true, size: "14px"},
        //    image: {k: "", toDisplay: false, size: "20px"}
        //};

        for (var key in shopObject) {
            shopObjectDiv.attr(key, shopObject[key]);
            shopObjectDetails.attr(key, shopObject[key]);
            purchaseButton.attr(key, shopObject[key]);
        }


        shopObjectDiv.append(purchaseButton);
        shopObjectDiv.append(shopObjectDetails);

        shopDisplay.append(shopObjectDiv);
        shopDisplay.append("<br><br>");
    }
    $('.purchaseButton').on("click", function() {
        var item = $(this).attr('name');

        $.get("/purchase", {userID: userID, item: item}).done(function (data) {
            if (!(data.status)) {
                //alert user that purchase successful
            }
            userCoins = data.coinsLeft;
            console.log(data.coinsLeft);
            coinsDisplay.html(userCoins);

            $.get("/getStats", {userID: userID}).done(function(data){
                displayStats(data);
            });
        });
    });
}

function displayStats(statsData) {
    statsDisplay.html("");
    console.log(statsData);

    var statsObject = statsData;
    var statsObjectDiv = $('<div class="statsObject"></div>');

    var keyDict = {   // key to display, and show/hide boolean
        HP: {k: "HP: ", toDisplay: true, size: "20px"},
        Atk: {k: "Atk: ", toDisplay: true, size: "14px"},
        Def: {k: "Def: ", toDisplay: true, size: "14px"}
    };

    for (var key in statsObject) {
        if (keyDict[key]["toDisplay"]) {
            statsObjectDiv.append(keyDict[key]["k"] + statsObject[key] + "<br>");
        }
        statsObjectDiv.attr(key, statsObject[key]);
    }

    statsDisplay.append(statsObjectDiv);
    statsDisplay.append("<br>");
}

function getCallback(local_userID) {
    return function(){
        $.get("/refreshdata", {userID: local_userID}).done(function (data) {
            userCoins = data["coins"];
            var daySteps = data["daySteps"];

            stepDisplay.html(data["daySteps"]);
            stepDisplay.css('font-size', '300px');
            coinsDisplay.html(userCoins); //to change
            coinsDisplay.css('font-size', '300px');
        });
    }
}

