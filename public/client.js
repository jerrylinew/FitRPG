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
    });


    //getShop callback
    var shopData = [
        {
            name: "Sword",
            price: "30",
            details: "Atk +3",
            image: "/img/sword.jpg"
        },
        {
            name: "Armor",
            price: "50",
            details: "Def +5",
            image: "/img/Armor.jpg"
        }
    ];

    displayShop(shopData);
});


function displayShop(shopData) {

    for (var i = 0, len = shopData.length; i < len; i++) {
        var shopObject = shopData[i];
        var shopObjectDiv = $('<div class="shopObject"></div>');
        var purchaseButton = $('<button class="purchaseButton">Buy</button>');

        var keyDict = {   // key to display, and show/hide boolean
            name: {k: "", toDisplay: true, size: "20px"},
            price: {k: "Price: ", toDisplay: true, size: "14px"},
            details: {k: "Details: ", toDisplay: true, size: "14px"},
            image: {k: "", toDisplay: false, size: "20px"}
        };

        for (var key in shopObject) {
            if (keyDict[key]["toDisplay"]) {
                shopObjectDiv.append(keyDict[key]["k"] + shopObject[key] + "<br>");
            }
            shopObjectDiv.attr(key, shopObject[key]);
            purchaseButton.attr(key, shopObject[key]);
        }

        shopDisplay.append(shopObjectDiv);
        shopDisplay.append(purchaseButton);
        shopDisplay.append("<br><br>");
    }
}



$('.purchaseButton').on("click", function() {
    userCoins -= 100;
    coinsDisplay.html(userCoins);
});

function getCallback(local_userID) {
    return function(){
        $.get("/refreshdata", {userID: local_userID}).done(function (data) {
            userCoins = data["daySteps"];

            stepDisplay.html(data["daySteps"]);
            stepDisplay.css('font-size', '300px');
            coinsDisplay.html(userCoins); //to change
            coinsDisplay.css('font-size', '300px');
        });
    }
}

