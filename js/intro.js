$(document).ready (
    function () {
        console.log("intro.js loaded.");
    }
);

$(document).ready (
    function () {
        var devMode = true;
        if (devMode) {
            $("#intro").fadeOut(3000);
            $("#storyBG").fadeOut(3000);
        }
        else {
            introMusic();
            $("body").css("overflow", "hidden");
            $("#titleScreen-content").fadeIn(3000);
            $("#titleSubtitle").fadeIn(3000);
            $("#playButton").fadeIn(10000);
        }
    }
);

function closeIntro() {
    var $intro = $("#intro");
    var $play = $("#playButton");
    $intro.stop(false, true);
    $play.stop();
    $("#intro").fadeOut(3000);
    // $("#titleScreen-content").fadeOut(3000);
    setTimeout(
        function () {
            $("#story1").fadeIn(3000);
            setTimeout(
                function () {
                    $("#story1").fadeOut(3000);
                }, 6000
            );
            setTimeout(
                function () {
                    $("#story2").fadeIn(3000);
                }, 9000
            );
            setTimeout(
                function () {
                    $("#story2").fadeOut(3000);
                }, 15000
            );
            setTimeout(
                function () {
                    $("#story3").fadeIn(3000);
                }, 18000
            );
            setTimeout(
                function () {
                    $("#story3").fadeOut(3000);
                }, 21000
            );
            setTimeout(
                function () {
                    $("#storyBG").fadeOut(3000);
                }, 21000
            );
        }, 3000
    );
    $("body").css("overflow", "overlay");
    // stopMusic(intro);
}

function introMusic() {
    var audio = document.getElementById("introMusic");
    audio.volume = volume;
    audio.play();
    audio.currentTime = 0;
}