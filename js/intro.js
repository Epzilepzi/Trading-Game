$(document).ready (
    function () {
        console.log("intro.js loaded.");
    }
);

$(document).ready (
    function () {
        var devMode = true;
        if (devMode) {
            closeIntro();
        }
        else {
            introMusic();
            $("body").css("overflow", "hidden");
            $("#titleScreen-content").fadeIn(3000);
            $("#titleSubtitle").fadeIn(3000);
            $("#playButton").fadeIn(9000);
        }
    }
);

function closeIntro() {
    $("#intro").fadeOut(3000);
    $("#titleScreen-content").fadeOut(3000);
    $("body").css("overflow", "auto");
    // stopMusic(intro);
}

function introMusic() {
    var audio = document.getElementById("introMusic");
    audio.play();
    audio.currentTime = 0;
}