$(document).ready(
    function () {
        console.log("credits.js loaded.");
    }
);

function showCredits() {
    var music = document.getElementById("bgmusic");
    closeAllAlerts();
    $("#body").fadeOut(1500);
    setTimeout(
        function () {
            $("#credits").fadeIn(1500);
        }, 500
    );
    music.src = "audio/easy.mp3";
    playBg("bgmusic");
}