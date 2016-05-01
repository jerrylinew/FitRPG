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
var gameDisplay = $('#game');
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

    setInterval(function() {
        gameDisplay.append('<img id="bulletImage" src="images/bullet.png" alt="bullet"/>');
        $('#bulletImage').animate({
            left: '-=460'
        }, 1000, function(){
            var bulletImage = $('#bulletImage');
            bulletImage.fadeOut(250, function(){
                bulletImage.css({"left": "50"});
            });
            setTimeout(function(){
                bulletImage.remove();
            }, 300);
        });
    }, 4000);

    $("#attackBtn").on('click', function(e){
        e.preventDefault();
        $(this).attr('disabled', true);
        $('#userImage').animate({
            left: '+=460'
        }, 1000, function(){
            $('#userImage').animate({
                left: '-=460'
            }, 1000, function(){
                $('#attackBtn').removeAttr('disabled');
            });
        });
    });
});


function displayShop(shopData) {

    for (var index in shopData) {
        var shopObject = shopData[index];
        var shopObjectDiv = $('<div class="shopObject"></div>');
        shopObjectDiv.css("width", "280px");
        shopObjectDiv.css("height", "40px");

        var shopObjectDetails = $('<a class="popoverBtn" href="#"></a>');
        shopObjectDetails.attr("data-content", shopObject["stat"] + ": " + shopObject["effect"]);
        shopObjectDetails.attr("rel", "popover");
        shopObjectDetails.attr("data-placement", "top");
        shopObjectDetails.css("background", "url(" + shopObject["image"] + ") no-repeat");
        shopObjectDetails.css("background-size", "contain");
        shopObjectDetails.css("background-position", "90% 50%");
        shopObjectDetails.css("width", "200px");
        shopObjectDetails.css("height", "40px");
        shopObjectDetails.css("float", "left");
        shopObjectDetails.css("line-height", "40px");
        shopObjectDetails.css("text-align", "center");
        shopObjectDetails.css("font-size", "18px");
        shopObjectDetails.css("border", "1px solid #6C6C6C");
        shopObjectDetails.css("border-left", "none");
        shopObjectDetails.css("background-color", "lightskyblue");

        var objectText = $('<div>' + shopObject["name"] + '</div>');
        objectText.css("width", "150px");
        objectText.css("text-align", "center");
        shopObjectDetails.append(objectText);

        var purchaseButton = $('<button class="purchaseButton"></button>');
        purchaseButton.css("background", "url(images/coin.png) no-repeat");
        purchaseButton.css("background-size", "contain");
        purchaseButton.css("width", "80px");
        purchaseButton.css("height", "40px");
        purchaseButton.css("float", "left");
        purchaseButton.css("text-align", "right");
        purchaseButton.css("font-size", "16px");
        purchaseButton.html(shopObject["price"]);

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
        shopDisplay.append("<br>");
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
    $('.popoverBtn').popover({trigger: "hover"});
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

