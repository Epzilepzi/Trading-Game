$(document).ready (
    function () {
        console.log("menu.js loaded.");
    }
);

function visitTown(name) {
    var audio = document.getElementById("introMusic");
    var town = document.getElementById(name);
    var bgmusic = document.getElementById("bgmusic");
    $("#body").fadeIn(1000);
    $(town).fadeIn(1000);
    $("#mainMenu").fadeOut(1000);
    bgmusic.src = "audio/" + name +".mp3";
    console.log(bgmusic.src);
    playBg("bgmusic");
    audio.pause();
}