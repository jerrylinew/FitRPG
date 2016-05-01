/**
 * Created by jerrylinew on 4/29/16.
 */

var code;
var userID;
var userName;
var userGender;
var userCoins;
var userHP;

var nameDisplay = $('#nameDisplay');
var coinsDisplay = $('#coinsDisplay');
var shopDisplay = $('#shopContainer');
var gameDisplay = $('#game');
var atkDisplay = $('#atkDisplay');
var defDisplay = $('#defDisplay');
var stepsDisplay = $('#stepState');
var sleepDisplay = $('#sleepState');

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    console.log(name);
    console.log(results);
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
        nameDisplay.html(userName);
        userHP = data.stats.HP;
        console.log(userHP);
        $('.progressWrap:first').css("width", String(userHP) + '%');

        var refreshInterval = 1; //in minutes
        console.log("getting steps");

        $.get("/refreshdata", {userID: userID}).done(function(data) {
            userCoins = data["coins"];
            var daySteps = data["daySteps"];

            coinsDisplay.html(userCoins); //to change

            $.get("/setupShop").done(function(data){
                displayShop(data);
            });

            $.get("/getStats", {userID: userID}).done(function(data){
                displayStats(data);
            });

            $.get("/getSteps", {userID: userID}).done(function(mydata){
                console.log(mydata);
                displaySteps(mydata);
            });

            //$.get("/getSleep", {userID: userID}).done(function(data){
            //    displaySleep(data);
            //});
            displaySleep(4036);
        });

        setInterval(getCallback(userID), 1000 * 60 * refreshInterval);
    });

    setInterval(function() {
        gameDisplay.append('<img id="bulletImage" src="images/bullet.png" alt="bullet"/>');
        $('#bulletImage').animate({
            left: '-=460'
        }, 1000, function(){
            $.get("/attacked", {userID: userID}).done(function(data){
                var hpLeft = data.HP;
                var isDead = data.isDead;
                if(hpLeft == undefined)
                    return;
                $('.progressWrap:first').css("width", String(hpLeft) + '%');
                console.log(hpLeft);
                console.log(isDead);
            });
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

        var shopObjectName = $('<div class="shopObjectName"></div>');
        shopObjectName.css("background", "url(" + shopObject["image"] + ") no-repeat");
        shopObjectName.css("background-size", "contain");
        shopObjectName.css("background-position", "90% 50%");
        shopObjectName.css("width", "200px");
        shopObjectName.css("height", "40px");
        shopObjectName.css("float", "left");
        shopObjectName.css("line-height", "40px");
        shopObjectName.css("text-align", "center");
        shopObjectName.css("font-size", "18px");
        shopObjectName.css("border", "1px solid #6C6C6C");
        shopObjectName.css("border-left", "none");
        shopObjectName.css("background-color", "lightskyblue");

        var objectText = $('<div>' + shopObject["name"] + '</div>');
        objectText.css("width", "150px");
        objectText.css("text-align", "center");
        shopObjectName.append(objectText);


        var purchaseButton = $('<button class="purchaseButton"></button>');
        purchaseButton.css("background", "url(images/coin.png) no-repeat");
        purchaseButton.css("background-size", "40%");
        purchaseButton.css("background-position", "5% 50%");
        purchaseButton.css("width", "80px");
        purchaseButton.css("height", "40px");
        purchaseButton.css("float", "left");
        purchaseButton.css("text-align", "right");
        purchaseButton.css("font-size", "16px");
        purchaseButton.html(shopObject["price"]);

        for (var key in shopObject) {
            shopObjectDiv.attr(key, shopObject[key]);
            shopObjectName.attr(key, shopObject[key]);
            purchaseButton.attr(key, shopObject[key]);
        }

        shopObjectDiv.append(purchaseButton);
        shopObjectDiv.append(shopObjectName);

        var shopObjectDetail = $('<div class="shopObjectDetail"></div>');
        shopObjectDetail.css("width", "280px");
        shopObjectDetail.css("height", "35px");
        shopObjectDetail.css("text-align", "center");
        shopObjectDetail.css("font-size", "16px");
        shopObjectDetail.css("border", "2px solid #C0C0C0");
        shopObjectDetail.css("border-top", "none");
        shopObjectDetail.css("line-height", "35px");
        shopObjectDetail.html(shopObject["stat"] + ": +" + shopObject["effect"]);

        shopDisplay.append(shopObjectDiv);
        shopDisplay.append(shopObjectDetail);
        shopDisplay.append("<br>");
    }

    $('.purchaseButton').on("click", function() {
        console.log("shop button clicked");

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
    console.log(statsData);

    atkDisplay.html(statsData["Atk"]);
    defDisplay.html(statsData["Def"]);
}

function displaySteps(stepsData) {
    console.log(stepsData);
    var chart = $('<div class="chart"></div>');

    var canvas = $('<canvas id="stepsChart" class="pie"></canvas>');
    var legend = $('<div id="stepsLegend"></div>');

    chart.append(canvas);
    chart.append(legend);
    stepsDisplay.append(chart);
    //context
    var ctxPTD = $('#stepsChart').get(0).getContext("2d");

    var config = {
        type: 'doughnut',
        data: {
            labels: [
                "Steps today",
                "Steps to go"
            ],
            datasets: [{
                data: [
                    stepsData,
                    10000-stepsData
                ],
                backgroundColor: [
                    "#46BFBD",
                    "#4D5360",
                ],
            }]
        },
        options: {
            responsive: true
        }
    };

    var propertyTypes = new Chart(ctxPTD, config);
}

function displaySleep(sleepData) {
    console.log(sleepData);

    var chart = $('<div class="chart"></div>');

    var canvas = $('<canvas id="sleepChart" class="pie"></canvas>');
    var legend = $('<div id="sleepLegend"></div>');

    chart.append(canvas);
    chart.append(legend);
    stepsDisplay.append(chart);
    //context
    var ctxPTD = $('#sleepChart').get(0).getContext("2d");

    var config = {
        type: 'doughnut',
        data: {
            labels: [
                "Sleep time",
                "Sleep target"
            ],
            datasets: [{
                data: [
                    sleepData,
                    10000 - sleepData
                ],
                backgroundColor: [
                    "#36A2EB",
                    "#4D5360",
                ],
            }]
        },
        options: {
            responsive: true
        }
    };

    var propertyTypes = new Chart(ctxPTD, config);
}


function getCallback(local_userID) {
    return function(){
        $.get("/refreshdata", {userID: local_userID}).done(function (data) {
            userCoins = data["coins"];
            var daySteps = data["daySteps"];

            coinsDisplay.html(userCoins); //to change

            $.get("/setupShop").done(function(data){
                displayShop(data);
            });

            $.get("/getStats", {userID: userID}).done(function(data){
                displayStats(data);
            });

            $.get("/getSteps", {userID: userID}).done(function(data){
                console.log(data);
                displaySteps(data);
            });

            //$.get("/getSleep", {userID: userID}).done(function(data){
            //    displaySleep(data);
            //});
            displaySleep(4036);
        });
    }
}

