/**
 * Created by jerrylinew on 4/29/16.
 */

var code;
var userID;
var userName;
var userGender;
var userAge;

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

    $.get("http://fitrpg.herokuapp.com/getdata" + "?code=" + code + "#_=_", function(data) {
        console.log(data);
        userID = data.userID;
        userName = data.name;
        userGender = data.gender;
        $('#greetingDisplay').html("Hi " + userName);
        $('#greetingDisplay').css('font-size', '150px');
    });




    var refreshInterval = 0.1; //in minutes

    setInterval(function() {
        $.get("http://fitrpg.herokuapp.com/refreshdata" + "?userID=" + userID + "#_=_", function(data) {

            $('#stepDisplay').html(data["daySteps"]);
            $('#stepDisplay').css('font-size', '300px');
        });
    }, 1000 * 60 * refreshInterval);



});

