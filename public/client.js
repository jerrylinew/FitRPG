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
            userCoins = data["daySteps"];

            stepDisplay.html(data["daySteps"]);
            stepDisplay.css('font-size', '300px');
            coinsDisplay.html(userCoins); //to change
            coinsDisplay.css('font-size', '300px');
        });

        setInterval(getCallback(userID), 1000 * 60 * refreshInterval);
    });
});



$('#purchase').on("click", function() {
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

